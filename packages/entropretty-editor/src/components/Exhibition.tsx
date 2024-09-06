import { offscreenWorker } from "@/App";
import { DrawingBitmap } from "@/components/DrawingBitmap";
import { getSeedFamily, seedToKey } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

function Exhibition() {
  const [script, setScript] = useState<string | undefined>(undefined);

  const families = useMemo(() => {
    return Array(8)
      .fill(1)
      .map(() => getSeedFamily("Procedural"));
  }, []);

  const [focusSize, gridSize, rowSize] = useMemo(() => {
    const innerWidth = window.innerWidth;
    return [innerWidth / 2, innerWidth / 8, innerWidth / 16];
  }, []);

  useEffect(() => {
    console.log({ __SCRIPTS__ });
    console.log({ VITE_SCRIPTS: import.meta.env.VITE_SCRIPTS });
    const scriptURL = import.meta.env.VITE_SCRIPTS || __SCRIPTS__[0];
    if (scriptURL === undefined) {
      console.warn("No script found");
      return;
    }
    offscreenWorker.loadScript(scriptURL).then(() => {
      setScript(scriptURL);
    });
  }, []);

  if (!script) return null;

  return (
    <div className="flex flex-col">
      {families[0] && (
        <div className="flex flex-row flex-wrap justify-start items-start">
          <div>
            <DrawingBitmap
              key={seedToKey(families[0][0])}
              script={script}
              seed={families[0][0]}
              size={focusSize}
            />
          </div>
          <div className="grid grid-cols-4">
            {families[0].map((seed) => (
              <DrawingBitmap
                key={seedToKey(seed)}
                script={script}
                seed={seed}
                size={gridSize}
              />
            ))}
          </div>
        </div>
      )}
      {families.map((seeds) => (
        <div className="flex flex-row">
          {seeds.map((seed) => (
            <DrawingBitmap
              key={seedToKey(seed)}
              script={script}
              seed={seed}
              size={rowSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Exhibition;
