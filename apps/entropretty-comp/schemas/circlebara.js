import { split, strokeEach } from "entropretty-utils";

function draw(ctx, seed) {
  ctx.scale(50, 50);
  ctx.translate(1, 1);
  ctx.lineWidth = 0.04;
  ctx.beginPath();
  ctx.arc(0, 0, 0.98, 0, 10);
  ctx.stroke();
  ctx.lineWidth = 0.1;
  strokeEach(
    split(seed, 32),
    (b, i) => {
      if (b)
        ctx.arc(
          0,
          0,
          0.92,
          (i / 32) * Math.PI * 2,
          ((i + 1) / 32) * Math.PI * 2
        );
    },
    ctx
  );
}

export const schema = { draw, name: "Circle Bar A", artist: "gavofyork.dot" };
