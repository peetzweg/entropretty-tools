import { useEffect, useState } from "react";
import { getSeed } from "./utils";

type DrawFn = (context: CanvasRenderingContext2D, seed: Uint8Array) => void;

const addDrawing = (draw: DrawFn, parent: HTMLDivElement) => {};
function Exhibition() {
  const [script, setScript] = useState<{ draw: DrawFn } | undefined>(undefined);

  useEffect(() => {
    console.log(__SCRIPTS__);
    import(/* @vite-ignore */ __SCRIPTS__[0])
      .then((module) => {
        if (module.draw === undefined)
          throw new Error("draw function not found in script");
        console.log("Loaded the script", __SCRIPTS__[0]);
        console.log(module.draw);
        setScript(module);
      })
      .catch((error) => {
        console.error(error);
        console.info("Failed to load the script", __SCRIPTS__[0]);
      });
  }, []);
  console.log({ script });

  useEffect(() => {
    if (!script) return;

    console.log("drawing", script);
    Array(10)
      .fill(1)
      .forEach(() => {
        const seed = getSeed("Procedural");
        const canvas = document.body.appendChild(
          document.createElement("canvas")
        );
        const context = canvas.getContext("2d")!;
        canvas.title = seed.toString();
        const windowHeight = window.innerHeight;
        canvas.width = windowHeight / 2;
        canvas.height = windowHeight / 2;
        context.save();
        context.scale(canvas.width, canvas.height);
        script.draw(context, seed);
        context.restore();
      });
  }, [script]);

  return <div style={{ display: "grid" }}>Hello</div>;
}

export default Exhibition;
