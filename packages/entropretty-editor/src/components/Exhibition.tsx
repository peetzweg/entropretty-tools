import { useEffect, useMemo, useRef, useState } from "react";
import { DrawingBitmap } from "./DrawingBitmap";
import { offscreenWorker } from "../App";
import { getSeed } from "../utils";

function Exhibition() {
  const [script, setScript] = useState<string | undefined>(undefined);
  const ticking = useRef<boolean>(false);

  const [seeds, setSeeds] = useState<Uint8Array[]>(
    Array(9)
      .fill(1)
      .map(() => getSeed("Procedural"))
  );
  const size = useMemo(() => {
    return window.innerHeight / 3;
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

  useEffect(() => {
    const onScroll = () => {
      const scrollPercentage = getScrollPercentage();
      if (scrollPercentage > 90) {
        if (!ticking.current) {
          ticking.current = true;
          window.requestAnimationFrame(() => {
            const newSeeds = Array(9)
              .fill(1)
              .map(() => getSeed("Procedural"));
            setSeeds((oldSeeds) => [...oldSeeds, ...newSeeds]);
            ticking.current = false;
          });
        }
      }
    };
    const getScrollPercentage = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      return (scrollTop / scrollHeight) * 100;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-start  items-start">
      {script &&
        seeds.map((seed) => (
          <DrawingBitmap
            key={seed.join(",")}
            script={script}
            seed={seed}
            size={size}
          />
        ))}
    </div>
  );
}

export default Exhibition;
