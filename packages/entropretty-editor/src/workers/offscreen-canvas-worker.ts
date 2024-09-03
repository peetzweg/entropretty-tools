import * as Comlink from "comlink";

type DrawFn = (
  context: CanvasRenderingContext2D | OffscreenRenderingContext,
  seed: number[] | string | number
) => void;

const scripts = new Map<string, DrawFn>();

const getDraw = async (source: string): Promise<DrawFn> => {
  return import(/* @vite-ignore */ source)
    .then((module) => {
      if (module.draw) {
        return module.draw;
      } else if (module.schema && module.schema.draw) {
        return module.schema.draw;
      } else {
        throw new Error("draw function not found in script");
      }
    })
    .catch((error) => {
      console.error(error);
      console.info("Failed to load the script", __SCRIPTS__[0]);
    });
};

const offscreen = {
  scripts: new Map<string, DrawFn>(),
  loadScript: async (scriptSource: string) => {
    try {
      console.log("Loading script", scriptSource);
      const draw = await getDraw(scriptSource);
      scripts.set(scriptSource, draw);
      return true;
    } catch (exception) {
      console.error(
        `Error importing module from script '${scriptSource}'`,
        exception
      );
      throw exception;
    }
  },
  hasScript: async (scriptSource: string) => {
    return scripts.get(scriptSource);
  },
  draw: async (
    scriptSource: string,
    seed: Uint8Array | string | number,
    size: number
  ) => {
    console.log("invoked");
    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d");
    if (!context) throw "Unable to get Context from given Canvas";

    const draw = scripts.get(scriptSource);
    if (draw === undefined)
      throw "Draw function not loaded, try loading it first";

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.scale(canvas.width, canvas.height);

    try {
      console.log("draw");
      draw(context, seed as unknown as number[]);
      console.log("finished");
    } catch (e) {
      console.error("Error drawing", scriptSource);
      console.info(e);
    }

    const blob = await canvas.convertToBlob();
    console.log("converted blob");
    return URL.createObjectURL(blob);
  },
  drawTransfer: async (
    scriptSource: string,
    seed: Uint8Array | string | number,
    size: number
  ) => {
    const canvas = new OffscreenCanvas(size, size);
    const context = canvas.getContext("2d");
    if (!context) throw "Unable to get Context from given Canvas";

    const draw = scripts.get(scriptSource);
    if (draw === undefined)
      throw "Draw function not loaded, try loading it first";

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.scale(canvas.width, canvas.height);

    try {
      draw(context, seed as unknown as number[]);
    } catch (e) {
      console.error("Error drawing", scriptSource);
      console.info(e);
    }

    const bitmap = canvas.transferToImageBitmap();
    return Comlink.transfer(bitmap, [bitmap]);
  },
};

export type OffscreenCanvasWorker = typeof offscreen;

Comlink.expose(offscreen);
