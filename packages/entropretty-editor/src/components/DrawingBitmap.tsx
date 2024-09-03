import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { offscreenWorker } from "../App";
import { cn } from "../lib/utils";
import { useApp } from "../state";

interface Props {
  seed: Uint8Array;
  script: string;
  size: number;
}

export const DrawingBitmap: React.FC<Props> = ({
  seed,
  script,
  size,
}: Props) => {
  const [ready, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pick = useApp((state) => state.pick);
  const remove = useApp((state) => state.remove);
  const mode = useApp((state) => state.mode);

  useEffect(() => {
    if (canvasRef.current === null) return;
    offscreenWorker.drawTransfer(script, seed, size).then((bitmap) => {
      canvasRef.current!.getContext("2d")!.drawImage(bitmap, 0, 0, size, size);
      setIsReady(true);
    });
  }, [seed, script, size]);

  return (
    <>
      <Skeleton
        title={seed.join(",")}
        className={cn({ hidden: ready })}
        style={{ width: size, height: size }}
      />
      <canvas
        onClick={() => (mode === "picked" ? remove(seed) : pick(seed))}
        title={seed.join(",")}
        className={cn("cursor-pointer", { hidden: !ready })}
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </>
  );
};
