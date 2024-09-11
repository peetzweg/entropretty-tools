import * as Comlink from "comlink";
import type { Schema } from "entropretty-editor";

const schemas = new Map<string, Schema>();
const test = await new Promise((resolve) => resolve(true));
if (test) {
  console.log("tla");
}
const offscreen = {
  init: async () => {
    const SCHEMAS = import.meta.glob("../schemas/*.js");
    console.log({ SCHEMAS });
    const schemaImports = import.meta.glob("../schemas/*.js");
    console.log({ schemaImports });
    await Promise.all(
      Object.entries(schemaImports).map(async ([name, promise]) => {
        console.log("init", { name, promise });
        try {
          const module = ((await promise()) as any).schema as Schema;

          schemas.set(module.name, module);
        } catch (e) {
          console.log({ e });
        }
      })
    );
    console.log({ schemaMap: schemas });
    return Array.from(schemas.keys());
  },
  hasSchema: (name: string) => {
    return schemas.has(name);
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
