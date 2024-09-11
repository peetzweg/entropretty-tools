import { Remote } from "comlink";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OffscreenCanvasWorker } from "./workers/offscreen-canvas-worker";
type Mode = "explore" | "picked";

interface AppState {
  worker: Remote<OffscreenCanvasWorker> | null;
  setWorker: (worker: Remote<OffscreenCanvasWorker>) => void;
  mode: Mode;
  changeMode: (newMode: Mode) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      worker: null,
      setWorker(worker) {
        set({ worker });
      },
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
