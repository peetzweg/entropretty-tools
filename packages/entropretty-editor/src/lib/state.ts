import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EntroprettyEditorWorker } from "./createWorker";
import { Remote, wrap } from "comlink";

type Mode = "explore" | "picked";

interface AppState {
  worker: Remote<EntroprettyEditorWorker> | null;
  schemas: string[];
  schema: string | null;
  setSchema: (schema: string) => void;
  init: (worker: Worker) => Promise<void>;
  mode: Mode;
  changeMode: (newMode: Mode) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      worker: null,
      schema: null,
      schemas: [],
      async init(worker) {
        const wrapped: Remote<EntroprettyEditorWorker> = wrap(worker);
        const schemas = await wrapped.init();
        if (get().schema === null) {
          set({ schema: schemas[0] });
        }

        set({
          worker: wrapped,
          schemas,
        });
      },
      setSchema(schema) {
        set({ schema });
      },
      mode: "explore",
      changeMode(newMode) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        set({ mode: newMode });
      },
    }),
    {
      name: "entropretty-editor-state",
      partialize: (state) => ({
        mode: state.mode,
        schema: state.schema,
      }),
    }
  )
);
