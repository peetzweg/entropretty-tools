import {
  split,
  bytesToNibbles,
  bit,
  bits,
  symmetrical,
  strokeEach,
  fillEach,
  numeric,
  randomGenerator,
  sfc32,
  COLORS,
} from "entropretty-utils"

// Create the prelude script by stringifying all the functions
export const preludeScript = `
  const black = "${COLORS.black}"
  const white = "${COLORS.white}"
  const light = "${COLORS.light}"
  const dark = "${COLORS.dark}"

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

console.log(preludeScript)
