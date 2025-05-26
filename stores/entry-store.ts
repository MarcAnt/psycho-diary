import { Entry } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from "crypto-js";

export type EntryActions = {
  addEntry: (entry: Omit<Entry, "id" | "comments">) => void;
  deleteEntry: (id: string) => void;
  getEntries: () => void;
  filteredEntries: (valueToFilter: string | Date) => Entry[];
  setDateEntries: (entries: Entry[]) => void;
  getTotalEntries: () => number;
  setLoading: (loading: boolean) => void;
  deleteComment: (id: string) => void;
  addComment: (comment: string, entryId: string) => void;
};

type EntryState = {
  entries: Entry[];
  loading: boolean;
};

export type EntryStore = EntryState & EntryActions;

export const defaultInitState: EntryState = {
  entries: [],
  loading: true,
};

export const initEntryStore = (): EntryState => {
  return { entries: [], loading: true };
};

const supabase = createClient();

const key = process.env.NEXT_PUBLIC_SECRET_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

export const createEntryStore = (initState: EntryState = defaultInitState) => {
  return createStore<EntryStore>()(
    persist(
      (set, get) => ({
        ...initState,
        getEntries: async () => {
          const { data, error } = await supabase
            .from("entries")
            .select(
              "id, title, description, date, created_at, comments(comment, created_at, id)"
            );
          if (error) {
            console.log("error:", error);
            return;
          } else {
            set((state) => {
              return { entries: [...state.entries, ...data] };
            });
          }
        },
        setDateEntries: (entries) => {
          const decryptedEntries = entries.map((entry) => {
            let decryptedTitle = "";
            let decryptedComment = "";

            if (entry.title) {
              decryptedTitle = CryptoJS.AES.decrypt(entry.title, keyutf, {
                iv: iv,
              }).toString(CryptoJS.enc.Utf8);
            }
            const decryptedDescription = CryptoJS.AES.decrypt(
              entry.description,
              keyutf,
              { iv: iv }
            ).toString(CryptoJS.enc.Utf8);

            if (entry.comments.length) {
              decryptedComment = CryptoJS.AES.decrypt(
                entry.comments[0].comment!,
                keyutf,
                { iv: iv }
              ).toString(CryptoJS.enc.Utf8);
            }

            return {
              ...entry,
              title: decryptedTitle,
              description: decryptedDescription,
              comments: decryptedComment
                ? [{ ...entry.comments[0], comment: decryptedComment }]
                : [],
            };
          });

          return set({ entries: decryptedEntries });
        },
        addEntry: async (entry) => {
          let encryptedTitle = "";

          if (entry.title) {
            encryptedTitle = CryptoJS.AES.encrypt(entry.title, keyutf, {
              iv: iv,
            }).toString();
          }

          const encryptedDescription = CryptoJS.AES.encrypt(
            entry.description,
            keyutf,
            { iv: iv }
          ).toString();

          const newEntry = {
            title: encryptedTitle,
            description: encryptedDescription,
            date: entry.date,
          };

          const { error } = await supabase.from("entries").insert([newEntry]);

          if (error) {
            console.error("Error inserting data:", error);
            return;
          }

          set((state) => {
            notifications.show({
              title: "Nueva entrada",
              message: "Nueva entrada creada con éxito",
              position: "bottom-left",
              styles: (theme) => ({
                title: { color: theme.white },
                description: { color: theme.white },
                icon: { color: theme.white },
                body: { color: theme.white },
                closeButton: {
                  backgroundColor: "var(--mantine-color-green-7)",
                  color: theme.white,
                },

                root: {
                  backgroundColor: "var(--mantine-color-green-7)",
                  color: theme.white,
                },
              }),
            });

            return {
              entries: [
                ...state.entries,
                { ...entry, id: uuid(), comments: [] },
              ],
            };
          });
        },
        deleteEntry: async (id) => {
          const { error } = await supabase
            .from("entries")
            .delete()
            .eq("id", id);
          if (error) {
            console.error("Error al eliminar tarea:", error);
            return;
          }
          set((state) => {
            if (!id) return state;

            notifications.show({
              title: "Entrada eliminada",
              message: "Entrada eliminada éxito",
              position: "bottom-left",
              styles: (theme) => ({
                title: { color: theme.white },
                description: { color: theme.white },
                icon: { color: theme.white },
                body: { color: theme.white },
                closeButton: {
                  backgroundColor: "var(--mantine-color-green-7)",
                  color: theme.white,
                },

                root: {
                  backgroundColor: "var(--mantine-color-green-7)",
                  color: theme.white,
                },
              }),
            });

            return {
              entries: get().entries.filter((entry) => entry.id !== id),
            };
          });
        },
        filteredEntries: (valueToFilter) => {
          if (valueToFilter instanceof Date) {
            return get().entries.filter((entry) => {
              const valueDate = dayjs(valueToFilter);
              const entryDate = dayjs(entry.date);

              return dayjs(entryDate).isSame(valueDate, "date");
            });
          }

          const filteredByTitle = get().entries.filter((entry) => {
            if (entry.title) {
              return entry.title
                .toLowerCase()
                .includes(valueToFilter.toLowerCase());
            }
          });

          const filteredByDescription = get().entries.filter((entry) => {
            return entry.description
              .toLowerCase()
              .includes(valueToFilter.toLowerCase());
          });

          const filteredByDate = () => {
            if (valueToFilter === "recent") {
              return get().entries.sort((a, b) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
              });
            } else if (valueToFilter === "old") {
              return get().entries.sort((a, b) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              });
            } else {
              return [];
            }
          };

          const filteredByUniques = new Set([
            ...filteredByTitle,
            ...filteredByDescription,
            ...filteredByDate(),
          ]);

          const uniqueEntries = [...filteredByUniques];

          return uniqueEntries;
        },
        getTotalEntries: () => {
          const total = get().entries.length;
          return total;
        },
        setLoading: (loading) => {
          set({ loading });
        },
        deleteComment: async (id) => {
          const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("Error al eliminar tarea:", error);
            return;
          }

          const { data } = await supabase
            .from("entries")
            .select(
              "id, title, description, date, created_at, comments(comment, created_at, id)"
            );

          if (data) {
            set(() => {
              return {
                entries: data,
              };
            });
          }

          notifications.show({
            title: "Comentario eliminado",
            message: "Comentario eliminado éxito",
            position: "bottom-left",
            styles: (theme) => ({
              title: { color: theme.white },
              description: { color: theme.white },
              icon: { color: theme.white },
              body: { color: theme.white },
              closeButton: {
                backgroundColor: "var(--mantine-color-green-7)",
                color: theme.white,
              },

              root: {
                backgroundColor: "var(--mantine-color-green-7)",
                color: theme.white,
              },
            }),
          });
        },
        addComment: async (comment, entryId) => {
          if (!comment) {
            return;
          }

          const encryptedComment = CryptoJS.AES.encrypt(comment, keyutf, {
            iv: iv,
          }).toString();

          const { error, status } = await supabase.from("comments").insert([
            {
              comment: encryptedComment,
              entry_id: entryId,
            },
          ]);

          const { data } = await supabase
            .from("entries")
            .select(
              "id, title, description, date, created_at, comments(comment, created_at, id)"
            );
          if (data) {
            get().setDateEntries(data);
          }

          if (error) {
            console.error("Error inserting data:", error);
            return;
          }

          if (status === 201) {
            close();
          }

          notifications.show({
            title: "Nuevo comentario",
            message: "Nuevo comentario agregado con éxito",
            position: "bottom-left",
            styles: (theme) => ({
              title: { color: theme.white },
              description: { color: theme.white },
              icon: { color: theme.white },
              body: { color: theme.white },
              closeButton: {
                backgroundColor: "var(--mantine-color-green-7)",
                color: theme.white,
              },

              root: {
                backgroundColor: "var(--mantine-color-green-7)",
                color: theme.white,
              },
            }),
          });
        },
      }),
      {
        name: "entries-storage",
        skipHydration: true,
        storage: {
          getItem: (name) => {
            const encrypted = localStorage.getItem(name);
            return encrypted
              ? JSON.parse(
                  CryptoJS.AES.decrypt(encrypted, keyutf, { iv: iv }).toString(
                    CryptoJS.enc.Utf8
                  )
                )
              : null;
          },
          setItem: (name, value) => {
            const encrypted = CryptoJS.AES.encrypt(
              JSON.stringify(value),
              keyutf,
              { iv: iv }
            ).toString();
            localStorage.setItem(name, encrypted);
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  );
};
