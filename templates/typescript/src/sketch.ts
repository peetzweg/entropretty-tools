import { FamilyKind, ProceduralSeed } from "./types";

export function draw(ctx: CanvasRenderingContext2D, argSeed: Uint8Array) {
  console.log({ argSeed });
  if (argSeed.length !== 4) {
    console.error("Seed must be exactly 4 bytes long");
    return;
  }

  // Use each byte of the seed
  const bodyColor = argSeed[0];
  const patternColor = argSeed[1];
  const curvature = argSeed[2] / 255;
  const patternSize = argSeed[3] / 255;

  // Set canvas size
  const width = 1;
  const height = 1;
  ctx.clearRect(0, 0, width, height);

  // Calculate fish dimensions
  const centerX = width / 2;
  const centerY = height / 2;
  const fishLength = width * 0.8;
  const fishWidth = height * 0.3;

  // Draw fish body
  ctx.beginPath();
  ctx.moveTo(centerX - fishLength / 2, centerY);
  ctx.bezierCurveTo(
    centerX - fishLength / 4,
    centerY - (fishWidth / 2) * curvature,
    centerX + fishLength / 4,
    centerY - (fishWidth / 2) * curvature,
    centerX + fishLength / 2,
    centerY
  );
  ctx.bezierCurveTo(
    centerX + fishLength / 4,
    centerY + (fishWidth / 2) * curvature,
    centerX - fishLength / 4,
    centerY + (fishWidth / 2) * curvature,
    centerX - fishLength / 2,
    centerY
  );
  ctx.closePath();

  // Fill fish body
  const gradient = ctx.createLinearGradient(
    centerX - fishLength / 2,
    centerY,
    centerX + fishLength / 2,
    centerY
  );
  gradient.addColorStop(0, `hsl(${bodyColor}, 80%, 85%)`);
  gradient.addColorStop(1, `hsl(${bodyColor}, 80%, 65%)`);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw pattern
  const patternCount = 3 + Math.floor(patternSize * 3);
  for (let i = 0; i < patternCount; i++) {
    const t = i / (patternCount - 1);
    const x = centerX - fishLength / 2 + fishLength * t;
    const y = centerY + ((Math.sin(t * Math.PI) * fishWidth) / 4) * curvature;
    const spotSize = fishWidth * 0.1 * (1 - t);

    ctx.beginPath();
    ctx.arc(x, y, spotSize, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${patternColor}, 80%, 50%, 0.6)`;
    ctx.fill();
  }

  // Draw eye
  const eyeX = centerX - fishLength / 3;
  const eyeY = centerY - fishWidth / 6;
  const eyeSize = fishWidth * 0.05;
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, eyeSize, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();

  // Draw fin
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - fishWidth / 3);
  ctx.quadraticCurveTo(
    centerX + fishLength / 8,
    centerY,
    centerX,
    centerY + fishWidth / 3
  );
  ctx.strokeStyle = `hsla(${bodyColor}, 80%, 40%, 0.6)`;
  ctx.lineWidth = fishWidth * 0.03;
  ctx.stroke();
}

interface Schema<> {
  draw: (context: CanvasRenderingContext2D, seed: ProceduralSeed) => void;
  kind: FamilyKind;
  name: string;
  author: string;
}

export const schema: Schema = {
  draw,
  kind: "Procedural",
  name: "Petals",
  author: "Jenn Schiffer",
};

export default schema;
