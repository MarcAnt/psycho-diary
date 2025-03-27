"use client";
import { Entry } from "@/app/types";
// import { notifications } from "@mantine/notifications";
import { v4 as uuid } from "uuid";
import { createStore } from "zustand";

export type EntryActions = {
  addEntry: (entry: Omit<Entry, "id">) => void;
  deleteEntry: (id: string) => void;
};

type EntryState = {
  entries: Entry[];
};

export type EntryStore = EntryState & EntryActions;

export const defaultInitState: EntryState = {
  entries: [],
};

export const initEntryStore = (): EntryState => {
  return { entries: [] };
};

export const createEntryStore = (initState: EntryState = defaultInitState) => {
  return createStore<EntryStore>()((set) => ({
    ...initState,
    addEntry: (entry) =>
      set((state) => {
        // notifications.show({
        //   title: "Nueva entrada",
        //   message: "Nueva entrada creada con éxito",
        //   position: "bottom-left",
        //   styles: (theme) => ({
        //     title: { color: theme.white },
        //     description: { color: theme.white },
        //     icon: { color: theme.white },
        //     body: { color: theme.white },
        //     closeButton: {
        //       backgroundColor: "var(--mantine-color-green-7)",
        //       color: theme.white,
        //     },

        //     root: {
        //       backgroundColor: "var(--mantine-color-green-7)",
        //       color: theme.white,
        //     },
        //   }),
        // });

        return {
          entries: [...state.entries, { ...entry, id: uuid() }],
        };
      }),
    deleteEntry: (id) =>
      set((state) => {
        if (!id) return state;

        const filteredEntries = state.entries.filter((entry) => {
          console.log(id, entry.id);
          if (entry.id === id) {
            return;
          } else {
            return entry;
          }
        });

        // notifications.show({
        //   title: "Entrada eliminada",
        //   message: "Entrada eliminada éxito",
        //   position: "bottom-left",
        //   styles: (theme) => ({
        //     title: { color: theme.white },
        //     description: { color: theme.white },
        //     icon: { color: theme.white },
        //     body: { color: theme.white },
        //     closeButton: {
        //       backgroundColor: theme.colors.red[9],
        //       color: theme.white,
        //     },

        //     root: {
        //       backgroundColor: theme.colors.red[9],
        //       color: theme.white,
        //     },
        //   }),
        // });

        return { entries: [...filteredEntries] };
      }),
  }));
};
