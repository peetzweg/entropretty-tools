import { SchemaMetadata } from "@/types";
import { Remote, wrap } from "comlink";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EntroprettyEditorWorker } from "./createWorker";

export const MODES = ["horizontal", "vertical", "grid", "single"] as const;
type Mode = (typeof MODES)[number];

interface AppState {
  worker: Remote<EntroprettyEditorWorker> | null;
  schemas: SchemaMetadata[];
  schema: SchemaMetadata | null;
  setSchema: (schema: string) => void;
  init: (worker: Worker) => Promise<void>;
  showControls: boolean;
  toggleControls: () => void;
  mode: Mode;
  cycleMode: () => void;
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      worker: null,
      schema: null,
      showControls: true,
      toggleControls() {
        set({ showControls: !get().showControls });
      },
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
      setSchema(schemaName) {
        const schema = get().schemas.find((s) => s.name === schemaName);
        set({ schema });
      },
      mode: "horizontal",
      cycleMode() {
        const currentMode = get().mode;
        const currentIndex = MODES.indexOf(currentMode);
        const nextIndex = (currentIndex + 1) % MODES.length;
        set({ mode: MODES[nextIndex] });
      },
    }),
    {
      name: "entropretty-editor-state",
      partialize: (state) => ({
        mode: state.mode,
        showControls: state.showControls,
        schema: state.schema,
      }),
    }
  )
);
