import { Seed } from "../types"

/**
 * Helper function to safely get a byte from a Seed type
 * @param {Seed} seed - The seed to get byte from
 * @param {number} index - Index of the byte
 * @returns {number} The byte value
 */
function getByte(seed: Seed, index: number): number {
  return seed[index % seed.length]
}

/**
 * Splits a seed into multiple parts by dividing its bits
 * @param {Seed} seed - The seed to split
 * @param {number} parts - Number of parts to split the seed into
 * @returns {number[]} Array of numbers, each representing a portion of the seed
 */
export function split(seed: Seed, parts: number): number[] {
  const r: number[] = []
  let last = 0
  for (let i = 0; i < parts; ++i) {
    const next = Math.round(((i + 1) * 32) / parts)
    r.push(bits(seed, last, next))
    last = next
  }
  return r
}

/**
 * Converts a Seed into an array of nibbles (4-bit values)
 * @param {Seed} bytes - Seed to convert
 * @returns {number[]} Array of nibbles (values 0-15)
 */
export function bytesToNibbles(bytes: Seed): number[] {
  const nibbles = new Array(bytes.length * 2)
  for (let i = 0; i < bytes.length; i++) {
    const byte = getByte(bytes, i)
    nibbles[i * 2] = (byte >> 4) & 15
    nibbles[i * 2 + 1] = byte & 15
  }
  return nibbles
}

/**
 * Gets a specific bit from a seed at a given position
 * @param {Seed} seed - The seed to extract bit from
 * @param {number} i - Bit position
 * @returns {0 | 1} The bit value (0 or 1)
 */
export function bit(seed: Seed, i: number): 0 | 1 {
  const byte = getByte(seed, Math.floor(i / 8))
  return ((byte >> i % 8) & 1) as 0 | 1
}

/**
 * Extracts a range of bits from a seed and converts them to a number
 * @param {Seed} seed - The seed to extract bits from
 * @param {number} [from=0] - Starting bit position
 * @param {number} [to=32] - Ending bit position
 * @returns {number} The extracted bits as an unsigned 32-bit integer
 */
export function bits(seed: Seed, from = 0, to = 32): number {
  let r = 0
  for (let i = from; i < to; ++i) {
    r = ((r << 1) | bit(seed, i)) >>> 0
  }
  return r
}

/**
 * Applies a drawing function with rotational symmetry
 * @param {number} factor - Number of symmetrical repetitions
 * @param {(i: number) => void} fn - Drawing function to apply
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function symmetrical(
  factor: number,
  fn: (i: number) => void,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.translate(50, 50)
  ctx.scale(50, 50)
  for (let i = 0; i < factor; ++i) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * i) / factor)
    fn(i)
    ctx.restore()
  }
}

/**
 * Applies a stroke drawing function to each element in an array
 * @template T The type of elements in the array
 * @param {T[]} array - Array of elements to iterate over
 * @param {(element: T, index: number) => void} fn - Function to apply for each stroke
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function strokeEach<T>(
  array: readonly T[],
  fn: (element: T, index: number) => void,
  ctx: CanvasRenderingContext2D,
): void {
  array.forEach((element, index) => {
    ctx.beginPath()
    fn(element, index)
    ctx.stroke()
  })
}

/**
 * Applies a fill drawing function to each element in an array
 * @template T The type of elements in the array
 * @param {T[]} array - Array of elements to iterate over
 * @param {(element: T, index: number) => void} fn - Function to apply for each fill
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
export function fillEach<T>(
  array: readonly T[],
  fn: (element: T, index: number) => void,
  ctx: CanvasRenderingContext2D,
): void {
  array.forEach((element, index) => {
    ctx.beginPath()
    fn(element, index)
    ctx.fill()
  })
}

/**
 * Converts a Seed into a BigInt
 * @param {Seed} seed - Seed to convert
 * @returns {BigInt} The numeric value as a BigInt
 * @throws {string} If seed is too long
 */
export function numeric(seed: Seed): bigint {
  const MAX_BYTES = 64
  if (seed.length > MAX_BYTES) {
    throw "Seed too long to safely convert to a bigint"
  }
  let result = 0n
  for (let i = 0; i < seed.length; i++) {
    result = (result << 8n) | BigInt(getByte(seed, i))
  }
  return result
}

/**
 * Creates a random number generator from a seed
 * @param {Seed} seed - Seed for the random number generator
 * @returns {() => number} A function that generates random numbers between 0 and 1
 */
export function randomGenerator(seed: Seed): () => number {
  let a: number = bits(seed)
  let b: number = bits(seed)
  let c: number = bits(seed)
  let d: number = bits(seed)
  return (): number => {
    const t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    return (((t + d) | 0) >>> 0) / 4294967296
  }
}

/**
 * Implementation of Small Fast Counter (SFC) 32-bit random number generator
 * @param {number} a - First state variable
 * @param {number} b - Second state variable
 * @param {number} c - Third state variable
 * @param {number} d - Fourth state variable
 * @returns {() => number} A function that generates random numbers between 0 and 1
 */
export function sfc32(
  a: number,
  b: number,
  c: number,
  d: number,
): () => number {
  return (): number => {
    a |= 0
    b |= 0
    c |= 0
    d |= 0
    const t = (((a + b) | 0) + d) | 0
    d = (d + 1) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}
