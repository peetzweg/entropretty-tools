/**
 * Random entropy of 32 bits represented in bytes.
 *
 * 32 Bit / 4 bytes / 4 elements between 0 and 255
 */

export type ProceduralSeed = Uint8Array;

/**
 * PersonalId of the user. A u64 number represented in bytes.
 *
 * 64 Bit / 8 bytes / 8 elements between 0 and 255
 */
export type ProceduralPersonalSeed = Uint8Array;

/**
 * AccountId of the user represented as 32 bytes
 *
 * 256 Bit / 32 bytes / 32 elements between 0 and 255
 */
export type ProceduralAccountSeed = Uint8Array;

export type FamilyKind =
  | "Procedural"
  | "ProceduralPersonal"
  | "ProceduralAccount";

export type DrawFn = (
  context: CanvasRenderingContext2D, // | OffscreenCanvasRenderingContext2D,
  seed: ProceduralSeed
) => void;

export type Schema = {
  draw: DrawFn;
  kind: FamilyKind;
  name: string;
  artist: string;
};
