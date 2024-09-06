import { createCanvas } from "canvas";

interface SampleOptions {
  amount: number;
  size: number;
}
export const sample = async (
  script: string,
  options?: Partial<SampleOptions>
) => {
  const fullOptions: SampleOptions = { size: 200, amount: 50, ...options };
  const { draw } = await import(`${process.cwd()}/${script}`);

  const [width, height] = [fullOptions.size, fullOptions.size];

  const scriptName = script.split("/").pop()?.split(".")[0];
  const outputDir = `./samples-${scriptName || "unknown"}`;

  const seeds = Array(fullOptions?.amount)
    .fill(1)
    .map(() => {
      return randSeed();
    });

  for (const seed of seeds) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.scale(width, height);
    ctx.aspect = width / height;
    ctx.save();
    draw(ctx, seed);
    ctx.restore();

    const buffer = canvas.toBuffer("image/png");
    await Bun.write(`./${outputDir}/${seed.join(",")}.png`, buffer);
  }
};

function randSeed(bytes = 4) {
  let s = [];
  for (var i = 0; i < bytes; ++i) {
    let n = Math.floor(Math.random() * 255);
    s.push(n);
  }
  return s;
}
