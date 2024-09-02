import { useEffect, useRef } from "react";

type DrawFn = (context: CanvasRenderingContext2D, seed: Uint8Array) => void;

interface Props {
  seed: Uint8Array;
  draw: DrawFn;
  size: number;
}
export const Drawing: React.FC<Props> = ({ seed, draw, size }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    canvasRef.current.title = seed.toString();

    canvasRef.current.width = size;
    canvasRef.current.height = size;

    const context = canvasRef.current.getContext("2d")!;
    context.save();
    context.scale(size, size);
    draw(context, seed);
    context.restore();
  }, [seed, draw, size]);

  return <canvas ref={canvasRef} />;
};
