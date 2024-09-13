import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FamilyKind } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rng = sfc32(1, 2, 3, 4);

export function getSeed(kind: FamilyKind): Uint8Array {
  return {
    Procedural: getRandomBytes(4, rng),
    ProceduralPersonal: Uint8Array.from([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      ...getRandomBytes(1, rng),
    ]),
    ProceduralAccount: getRandomBytes(32, rng),
  }[kind];
}

export function uint8ArrayToBinaryString(arr: Uint8Array): string {
  let binaryString = "";
  for (let i = 0; i < arr.length; i++) {
    binaryString += arr[i].toString(2).padStart(8, "0");
    if (i < arr.length - 1) {
      binaryString += " ";
    }
  }
  return binaryString;
}

export function seedToKey(seed: Uint8Array): string {
  return seed.join(",");
}

export function getSeedFamily(kind: FamilyKind): Uint8Array[] {
  const seed = getSeed(kind);
  const seedFamilyMap = new Map<string, Uint8Array>();
  seedFamilyMap.set(seedToKey(seed), seed);

  while (seedFamilyMap.size < 16) {
    const mutatedSeed = new Uint8Array(seed);
    // Only mutated last few bytes for ProceduralPersonal to make get reasonable u32 results resembling a personal id
    if (kind === "ProceduralPersonal") {
      const noOfBytes = 4;
      const lastBytes = seed.slice(-noOfBytes);
      mutateBits(Math.floor(Math.random() * 3) + 1)(lastBytes);
      mutatedSeed.set(lastBytes, mutatedSeed.length - noOfBytes);
    } else {
      mutateBits(Math.floor(Math.random() * 3) + 1)(mutatedSeed);
    }

    if (!seedFamilyMap.has(seedToKey(mutatedSeed))) {
      seedFamilyMap.set(seedToKey(mutatedSeed), mutatedSeed);
    }
  }

  return [...seedFamilyMap.values()];
}

function getRandomBytes(bytes: number, rng: () => number): Uint8Array {
  const result = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) {
    result[i] = Math.floor(rng() * 255);
  }
  return result;
}

function sfc32(a: number, b: number, c: number, d: number): () => number {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

export function bytesToNibbles(bytes: Uint8Array) {
  const nibbles = [];
  for (let i = 0; i < bytes.length; i++) {
    // Split each 8-bit number into two 4-bit numbers
    nibbles.push((bytes[i] >> 4) & 0xf); // Upper 4 bits
    nibbles.push(bytes[i] & 0xf); // Lower 4 bits
  }
  return nibbles;
}

export function mutateBits(count: number) {
  return (seed: Uint8Array) => {
    for (let b = 0; b < count; ++b) {
      const bit = 2 ** Math.floor(Math.random() * 8);
      const item = Math.floor(Math.random() * 4);
      seed[item] ^= bit;
    }
  };
}
