import { create } from "zustand";

interface StoreState {
  count: number;
  increment: () => void;
  incrementBy: (by: number) => void;
  decrement: () => void;
  reset: () => void;
}
const useCounterStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  incrementBy: (by: number) => set((state) => ({ count: state.count + by })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
export default useCounterStore;
