export type FamilyKind =
  | "Procedural"
  | "ProceduralPersonal"
  | "ProceduralAccount";

export const rng = sfc32(1, 2, 3, 4);

export function getSeed(kind: FamilyKind): Uint8Array {
  return {
    Procedural: getRandomBytes(4, rng),
    ProceduralPersonal: getRandomBytes(8, rng),
    ProceduralAccount: getRandomBytes(32, rng),
  }[kind];
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
    let t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
