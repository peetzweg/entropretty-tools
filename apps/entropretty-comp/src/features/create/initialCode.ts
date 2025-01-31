export default `ctx.translate(5, 5)
ctx.textAlign = "center"
ctx.textBaseline = "middle"

const length = seed.length
const grid = Math.ceil(Math.sqrt(length))
const cellSize = Math.floor(90 / grid)
const fontSize = Math.max(8, Math.floor(cellSize * 0.4))
ctx.font = \`\${fontSize}px sans-serif\`

seed.forEach((n, i) => {
  const row = Math.floor(i / grid)
  const col = i % grid
  const x = col * cellSize
  const y = row * cellSize

  // Draw cell border
  ctx.strokeStyle = "#ccc"
  ctx.strokeRect(x, y, cellSize, cellSize)

  // Draw number
  ctx.fillStyle = "#000"
  ctx.fillText(n.toString(), x + cellSize / 2, y + cellSize / 2)
})`
