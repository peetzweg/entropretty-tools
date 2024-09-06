import { create } from "zustand";
import { persist } from "zustand/middleware";
type Mode = "explore" | "picked";
interface AppState {
  mode: Mode;
  changeMode: (newMode: Mode) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      mode: "explore",
      changeMode(newMode) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        set({ mode: newMode });
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        mode: state.mode,
      }),
    }
  )
);
