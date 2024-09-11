import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OffscreenCanvasWorker } from "./lib/createWorker";
import { Remote, wrap } from "comlink";

type Mode = "explore" | "picked";

interface AppState {
  worker: Remote<OffscreenCanvasWorker> | null;
  setWorker: (worker: Worker) => void;
  mode: Mode;
  changeMode: (newMode: Mode) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      worker: null,
      setWorker(worker) {
        set({ worker: wrap(worker) });
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
