import { Schema } from "@/types";
import * as Comlink from "comlink";

export const createWorker = (
  dynamicImports: Record<string, () => Promise<unknown>>
) => {
  const _schemas = new Map<string, Schema>();
  let _isInitialized = false;
  return {
    init: async () => {
      await Promise.all(
        Object.values(dynamicImports).map(async (importPromise) => {
          try {
            const result = await importPromise();
            const module = (result as { schema: Schema }).schema as Schema;

            _schemas.set(module.name, module);
          } catch (e) {
            console.log({ e });
          }
        })
      );
      _isInitialized = true;
      return Array.from(_schemas.keys());
    },
    isInitialized: () => {
      return _isInitialized;
    },
    hasSchema: (name: string) => {
      return _schemas.has(name);
    },
    drawTransfer: async (name: string, seed: Uint8Array, size: number) => {
      const canvas = new OffscreenCanvas(size, size);
      const context = canvas.getContext("2d");
      if (!context)
        throw "Unable to get Context from OffscreenCanvas in Worker";

      const schema = _schemas.get(name);
      if (schema === undefined)
        throw "Schema not loaded, try adding it before drawing";

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.scale(canvas.width / 100, canvas.width / 100);
      context.lineWidth = 1;
      context.lineCap = "butt";
      context.lineJoin = "miter";
      context.strokeStyle = "black";
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "bottom";

      try {
        schema.draw(context as unknown as CanvasRenderingContext2D, seed);
      } catch (e) {
        console.error("Error drawing", name);
        console.info(e);
      }

      const bitmap = canvas.transferToImageBitmap();
      return Comlink.transfer(bitmap, [bitmap]);
    },
  };
};

export type EntroprettyEditorWorker = ReturnType<typeof createWorker>;
