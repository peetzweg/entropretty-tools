export function split(seed: Uint8Array, parts: number) {
  let r = [];
  let last = 0;
  for (let i = 0; i < parts; ++i) {
    let next = Math.round(((i + 1) * 32) / parts);
    r.push(bits(seed, last, next));
    last = next;
  }
  return r;
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

export function bit(seed: Uint8Array, i: number) {
  return (seed[Math.floor(i / 4) % 8] >> i % 4) & 1;
}

export function bits(seed: Uint8Array, from = 0, to = 32) {
  let r = 0;
  for (let i = from; i < to; ++i) {
    r = ((r << 1) | bit(seed, i)) >>> 0;
  }
  return r;
}
