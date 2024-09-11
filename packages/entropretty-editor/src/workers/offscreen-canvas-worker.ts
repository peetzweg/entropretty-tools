import * as Comlink from "comlink";
import { PassableSchema, Schema } from "../types";

type DrawFn = (
  context: CanvasRenderingContext2D | OffscreenRenderingContext,
  seed: number[] | string | number
) => void;

const schemas = new Map<string, Schema>();

const offscreen = {
  scripts: new Map<string, DrawFn>(),
  addSchema: (name: string, schema: PassableSchema) => {
    console.log({ schema });
    const actualSchema = {
      ...schema,
      draw: new Function("context", "seed", schema.draw),
    } as Schema;
    schemas.set(name, actualSchema);
  },
  hasSchema: (name: string) => {
    return !!schemas.get(name);
  },
  alive: (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("I'm alive");
      }, 1000);
    });
  },
  drawTransfer: async (name: string, seed: Uint8Array, size: number) => {
    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d");
    if (!context) throw "Unable to get Context from OffscreenCanvas in Worker";

    const schema = schemas.get(name);
    if (schema === undefined)
      throw "Schema not loaded, try adding it before drawing";

    context.clearRect(0, 0, canvas.width, canvas.height);
    // context.scale(canvas.width, canvas.height);
    context.scale(canvas.width / 100, canvas.width / 100);
    context.lineWidth = 1;
    context.lineCap = "butt";
    context.lineJoin = "miter";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "bottom";

    try {
      console.log("draw");
      schema.draw(context, seed);
    } catch (e) {
      console.error("Error drawing", name);
      console.info(e);
    }

    const bitmap = canvas.transferToImageBitmap();
    return Comlink.transfer(bitmap, [bitmap]);
  },
};

export type OffscreenCanvasWorker = typeof offscreen;

Comlink.expose(offscreen);
