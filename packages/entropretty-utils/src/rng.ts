// import Prando from "prando";
import { bits } from "./helpers.js";

export function randomGenerator(seed: Uint8Array) {
  throw "Not implemented yet";
  // const p = new Prando(numeric(seed.toString()));

  // return function () {
  //   return p.next();
  // };
}

export function cheapRandomGenerator(seed: Uint8Array) {
  let a = bits(seed);
  let b = bits(seed);
  let c = bits(seed);
  let d = bits(seed);
  return function () {
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
