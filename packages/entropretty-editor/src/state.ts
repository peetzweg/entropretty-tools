import { create } from "zustand";
import { persist } from "zustand/middleware";
type Mode = "explore" | "picked";
interface AppState {
  mode: Mode;
  changeMode: (newMode: Mode) => void;
  pickedSeeds: Uint8Array[];
  resetPicks: () => void;
  pick: (seed: Uint8Array) => void;
  remove: (seed: Uint8Array) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      mode: "explore",
      changeMode(newMode) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        set({ mode: newMode });
      },
      pickedSeeds: [],
      pick(seed) {
        set((state) => {
          return { pickedSeeds: [...state.pickedSeeds, seed] };
        });
      },
      remove(seed) {
        set((state) => {
          return {
            pickedSeeds: state.pickedSeeds.filter(
              (pickedSeed) => pickedSeed !== seed
            ),
          };
        });
      },
      resetPicks() {
        set({ pickedSeeds: [], mode: "explore" });
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        pickedSeeds: state.pickedSeeds.map((seed) => new Array(...seed)),
        mode: state.mode,
      }),
    }
  )
);
