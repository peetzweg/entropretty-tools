import { COLORS } from "./colors"
import { bit, bits, bytesToNibbles, fillEach, getByte, numeric, randomGenerator, sfc32, split, strokeEach, symmetrical } from "./functions"

export * from "./colors"
export * from "./functions"


export const preludeScriptString = `
  const black = "${COLORS.black}"
  const white = "${COLORS.white}"
  const light = "${COLORS.light}"
  const dark = "${COLORS.dark}"

  ${getByte.toString()}
  ${split.toString()}
  ${bytesToNibbles.toString()}
  ${bit.toString()}
  ${bits.toString()}
  ${symmetrical.toString()}
  ${strokeEach.toString()}
  ${fillEach.toString()}
  ${numeric.toString()}
  ${randomGenerator.toString()}
  ${sfc32.toString()}
`
