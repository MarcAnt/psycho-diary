import { create } from "zustand";

interface AuthActions {
  setProfile: (profile: string) => void;
  clearProfile: () => void;
}

interface AuthState {
  profile: string | null;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  profile: null,
  setProfile: (profile) => {
    set((state) => {
      return { profile: state.profile ? state.profile : profile };
    });
  },
  clearProfile: () => set({ profile: null }),
}));

export default useAuthStore;
