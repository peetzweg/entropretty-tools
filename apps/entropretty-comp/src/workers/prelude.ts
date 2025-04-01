import {
  bit,
  bits,
  bytesToNibbles,
  COLORS,
  fillEach,
  getByte,
  numeric,
  randomGenerator,
  sfc32,
  split,
  strokeEach,
  symmetrical,
} from "entropretty-utils"

// Create the prelude script by stringify all the functions
export const preludeScript = `
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

console.log({preludeScript})