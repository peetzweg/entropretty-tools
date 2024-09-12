import { Schema } from "@/types";

function draw(ctx: CanvasRenderingContext2D, seed: Uint8Array) {
  ctx.scale(100, 100);
  let seedIndex = 0;
  const random = () => {
    const value = seed[seedIndex] / 255;
    seedIndex = (seedIndex + 1) % seed.length;
    return value;
  };

  const GRID_SIZE = 4;
  const STROKE_STYLE = "black";
  const LINE_WIDTH = 0.01;
  const MARGIN = 0.08;
  const RADIUS = 0.08;
  ctx.translate(MARGIN, MARGIN);

  ctx.strokeStyle = STROKE_STYLE;
  ctx.lineWidth = LINE_WIDTH;

  const circles = createCircleGrid(GRID_SIZE, GRID_SIZE, MARGIN, RADIUS);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Seed-based randomization function

  // Choose a random starting position
  const startIdx = Math.floor(random() * GRID_SIZE * GRID_SIZE);
  const currentCircle =
    circles[Math.floor(startIdx / GRID_SIZE)][startIdx % GRID_SIZE];
  const connectedCircles: Circle[] = [currentCircle];

  const AMOUNT_OF_CIRCLES_TO_CONNECT = Math.max(3, Math.floor(random() * 6));

  // Continue making connections from the current circle to any other circle
  for (let i = 0; i < AMOUNT_OF_CIRCLES_TO_CONNECT; i++) {
    const availableCircles = circles
      .flat()
      .filter((c) => !connectedCircles.includes(c));
    if (availableCircles.length === 0) break;

    const nextCircleIdx = Math.floor(random() * availableCircles.length);
    const nextCircle = availableCircles[nextCircleIdx];

    connectedCircles.push(nextCircle);
  }

  // Draw the connected circles
  for (const circ of connectedCircles) {
    ctx.beginPath();
    ctx.arc(circ.x, circ.y, circ.r, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const notConnectedCircles = circles
    .flat()
    .filter((c) => !connectedCircles.includes(c));
  // Draw the connected circles
  for (const circ of notConnectedCircles) {
    ctx.beginPath();
    ctx.arc(circ.x, circ.y, 0.008, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Draw the connections between the circles
  for (let i = 0; i < connectedCircles.length; i++) {
    const [p1, p2] = getTangentPoints(
      connectedCircles[i % connectedCircles.length],
      connectedCircles[(i + 1) % connectedCircles.length]
    );

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}

function createCircleGrid(
  rows: number,
  cols: number,
  margin: number,
  radius: number
) {
  const circles: Circle[][] = [];
  const stepX = (1 - 2 * margin - 2 * (margin + radius)) / (cols - 1);
  const stepY = (1 - 2 * margin - 2 * (margin + radius)) / (rows - 1);

  for (let r = 0; r < rows; r++) {
    const row: Circle[] = [];
    for (let c = 0; c < cols; c++) {
      const x = margin + radius + c * stepX;
      const y = margin + radius + r * stepY;
      const circle = new Circle(x, y, radius);
      row.push(circle);
    }
    circles.push(row);
  }

  return circles;
}

function getTangentPoints(c1: Circle, c2: Circle): [Point2d, Point2d] {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const r = c1.r;
  const offsetX = (r * dy) / dist;
  const offsetY = (r * dx) / dist;

  const p1 = { x: c1.x + offsetX, y: c1.y - offsetY };
  const p2 = { x: c2.x + offsetX, y: c2.y - offsetY };

  return [p1, p2];
}

class Circle {
  x: number;
  y: number;
  r: number;
  neighbors: Circle[];

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.neighbors = [];
  }
}

interface Point2d {
  x: number;
  y: number;
}

export const schema: Schema = {
  draw,
  name: "Gummiring",
  artist: "peet.sh",
  kind: "Procedural",
};
