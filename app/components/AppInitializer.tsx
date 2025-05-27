"use client";
import { useEntryStore } from "@/providers/entries-store-provider";
import { ReactNode, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import useSWR from "swr";
import CryptoJS from "crypto-js";

const key = process.env.NEXT_PUBLIC_SECRET_KEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

async function fetchEntries() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, title, description, date, created_at, comments(comment, created_at, id)"
    );
  if (error) throw error;

  return data;
}

export default function AppInitializer({ children }: { children: ReactNode }) {
  const { data, isLoading } = useSWR("*", fetchEntries);
  const { setDateEntries, setLoading } = useEntryStore((state) => state);

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    }

    if (data?.length) {
      const decryptedEntries = data.map((entry) => {
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

      setDateEntries(decryptedEntries || []);
      setLoading(false);
    }
  }, [data, setDateEntries, setLoading, isLoading]);

  return children;
}
