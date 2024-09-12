import { Schema } from "@/types";
import { numeric } from "entropretty-utils";

function draw(ctx: CanvasRenderingContext2D, seed: Uint8Array) {
  const size = 100;
  const personalId = numeric(seed).toString();
  ctx.strokeStyle = "";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = size / 3 + "px serif";
  ctx.translate(0, size / 3);
  ctx.fillText(personalId, size / 2, size / 3, size);
}

export const schema: Schema = {
  draw,
  name: "Personal Id",
  artist: "peet.sh",
  kind: "ProceduralPersonal",
};
