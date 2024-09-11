import { Schema } from "@/types";
import * as Comlink from "comlink";

export const createWorker = (
  dynamicImports: Record<string, () => Promise<unknown>>
) => {
  const schemas = new Map<string, Schema>();
  return {
    init: async () => {
      await Promise.all(
        Object.entries(dynamicImports).map(async ([name, promise]) => {
          console.log("init", { name, promise });
          try {
            const module = ((await promise()) as { schema: Schema })
              .schema as Schema;

            schemas.set(module.name, module);
          } catch (e) {
            console.log({ e });
          }
        })
      );
      return Array.from(schemas.keys());
    },
    hasSchema: (name: string) => {
      return schemas.has(name);
    },
    drawTransfer: async (name: string, seed: Uint8Array, size: number) => {
      const canvas = new OffscreenCanvas(size, size);
      const context = canvas.getContext("2d");
      if (!context)
        throw "Unable to get Context from OffscreenCanvas in Worker";

      const schema = schemas.get(name);
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

export type OffscreenCanvasWorker = ReturnType<typeof createWorker>;
