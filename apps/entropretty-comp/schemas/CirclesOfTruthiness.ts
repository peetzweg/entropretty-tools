import { bit, fillEach } from "entropretty-utils"

const draw = (ctx, seed) => {
  const bits = Array.from({ length: seed.length * 8 }, (_, i) => bit(seed, i))

  const gridSize = Math.ceil(Math.sqrt(bits.length))
  const cellSize = 100 / gridSize // 100x100 canvas with 5px margin
  const rectSize = cellSize // Black rectangle size (for example, 20x20)

  // Draw a black rectangle in the top-left corner
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, rectSize, rectSize)

  // Translate grid to start at the bottom-right edge of the rectangle
  ctx.translate(cellSize, cellSize) // Add 5px margin and adjust for the rectangle size

  fillEach(
    bits,
    (b, i) => {
      if (b === 1) {
        const x = (i % gridSize) * cellSize + cellSize / 2
        const y = Math.floor(i / gridSize) * cellSize + cellSize / 2
        ctx.beginPath()
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    ctx,
  )
}

export const schema = {
  draw,
  artist: "LLM",
  name: "Circles of Truthiness",
  kind: "Procedural",
}
