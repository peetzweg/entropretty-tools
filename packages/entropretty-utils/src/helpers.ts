export function contextPrelude(ctx: CanvasRenderingContext2D) {
  ctx.lineWidth = 1
  ctx.lineCap = "butt"
  ctx.lineJoin = "miter"
  ctx.strokeStyle = "black"
  ctx.fillStyle = "black"
  ctx.textAlign = "center"
  ctx.textBaseline = "bottom"
  ctx.save()
}

export function split(seed: Uint8Array, parts: number) {
  let r = []
  let last = 0
  for (let i = 0; i < parts; ++i) {
    let next = Math.round(((i + 1) * 32) / parts)
    r.push(bits(seed, last, next))
    last = next
  }
  return r
}

export function bytesToNibbles(bytes: Uint8Array) {
  const nibbles = []
  for (let i = 0; i < bytes.length; i++) {
    // Split each 8-bit number into two 4-bit numbers
    nibbles.push((bytes[i] >> 4) & 0xf) // Upper 4 bits
    nibbles.push(bytes[i] & 0xf) // Lower 4 bits
  }
  return nibbles
}

export function bit(seed: Uint8Array, i: number) {
  return (seed[Math.floor(i / 4) % 8] >> i % 4) & 1
}

export function bits(seed: Uint8Array, from = 0, to = 32) {
  let r = 0
  for (let i = from; i < to; ++i) {
    r = ((r << 1) | bit(seed, i)) >>> 0
  }
  return r
}

export function symmetrical(
  factor: number,
  fn: (index: number) => void,
  ctx: CanvasRenderingContext2D,
) {
  ctx.translate(50, 50)
  ctx.scale(50, 50)
  for (let i = 0; i < factor; ++i) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / factor)
    fn(i)
    ctx.restore()
  }
}

export function strokeEach<E, T extends Array<E>>(
  array: T,
  fn: (element: E, index: number) => void,
  ctx: CanvasRenderingContext2D,
) {
  array.forEach((element, index) => {
    ctx.beginPath()
    fn(element, index)
    ctx.stroke()
  })
}

export function fillEach<E, T extends Array<E>>(
  array: T,
  fn: (element: E, index: number) => void,
  ctx: CanvasRenderingContext2D,
) {
  array.forEach((element, index) => {
    ctx.beginPath()
    fn(element, index)
    ctx.fill()
  })
}

export function numeric(seed: Uint8Array): bigint {
  const MAX_BYTES = 64

  if (seed.length > MAX_BYTES) {
    throw "Seed too long to safely convert to a bigint"
  }

  let result = 0n
  for (let i = 0; i < seed.length; i++) {
    result = (result << 8n) | BigInt(seed[i]) // Shift and add each byte
  }
  return result
}
