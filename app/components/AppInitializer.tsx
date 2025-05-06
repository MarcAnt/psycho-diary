"use client";
import { useEntryStore } from "@/providers/entries-store-provider";
import { ReactNode, useEffect } from "react";
import { createClient } from "../utils/supabase/client";
import useSWR from "swr";

async function fetchEntries() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("entry")
    .select(
      "id, title, description, date, created_at,comments(comment, created_at, id)"
    );
  if (error) throw error;
  return data;
}

export default function AppInitializer({ children }: { children: ReactNode }) {
  const { data, isLoading } = useSWR("*", fetchEntries);
  const { setDateEntries, setLoading } = useEntryStore((state) => state);

  useEffect(() => {
    setDateEntries(data || []);
    setLoading(isLoading);
  }, [data, setDateEntries, setLoading, isLoading]);

  return children;
}
