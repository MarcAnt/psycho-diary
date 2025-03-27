// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type EntryStore,
  createEntryStore,
  initEntryStore,
} from "@/stores/entry-store";

export type EntryStoreApi = ReturnType<typeof createEntryStore>;

export const EntryStoreContext = createContext<EntryStoreApi | undefined>(
  undefined
);

export interface EntryStoreProviderProps {
  children: ReactNode;
}

export const EntryStoreProvider = ({ children }: EntryStoreProviderProps) => {
  const storeRef = useRef<EntryStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createEntryStore(initEntryStore());
  }

  return (
    <EntryStoreContext.Provider value={storeRef.current}>
      {children}
    </EntryStoreContext.Provider>
  );
};

export const useEntryStore = <T,>(selector: (store: EntryStore) => T): T => {
  const counterStoreContext = useContext(EntryStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
