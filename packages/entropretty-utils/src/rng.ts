import Prando from "prando"
import { bits, numeric } from "./helpers.js"
import type { Seed } from "./types"

export function randomGenerator(seed: Seed) {
  const p = new Prando(numeric(seed).toString())

  return () => {
    return p.next()
  }
}

export function cheapRandomGenerator(seed: Seed) {
  let a = bits(seed)
  let b = bits(seed)
  let c = bits(seed)
  let d = bits(seed)
  return function () {
    var t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    t = (t + d) | 0
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}
