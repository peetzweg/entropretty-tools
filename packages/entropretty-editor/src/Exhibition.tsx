import { useEffect, useState } from "react";
import { Drawing } from "./Drawing";
import { getSeed } from "./utils";
type DrawFn = (context: CanvasRenderingContext2D, seed: Uint8Array) => void;

function Exhibition() {
  const [script, setScript] = useState<{ draw: DrawFn } | undefined>(undefined);

  const [seeds, setSeeds] = useState<Uint8Array[]>(
    Array(1000)
      .fill(1)
      .map(() => getSeed("Procedural"))
  );

  useEffect(() => {
    console.log(__SCRIPTS__);
    import(/* @vite-ignore */ __SCRIPTS__[0])
      .then((module) => {
        let parent = undefined;
        if (module.draw) {
          parent = module;
        } else if (module.schema && module.schema.draw) {
          parent = module.schema;
        } else {
          throw new Error("draw function not found in script");
        }
        setScript(parent);
      })
      .catch((error) => {
        console.error(error);
        console.info("Failed to load the script", __SCRIPTS__[0]);
      });
  }, []);

  return (
    <div className="flex flex-row flex-wrap">
      {script &&
        seeds.map((seed, index) => (
          <Drawing
            key={JSON.stringify(seed)}
            draw={script.draw}
            seed={seed}
            size={200}
          />
        ))}
    </div>
  );
}

export default Exhibition;
