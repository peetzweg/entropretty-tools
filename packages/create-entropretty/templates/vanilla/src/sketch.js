/**
 * This is a draw function.
 *
 * @param {CanvasRenderingContext2D} ctx - The context to draw on
 * @param {Uint8Array} seed - Array of bytes, depending on the kind of design, it is either 4, 8 or 32 bytes.
 */
function draw(ctx, seed) {}

/**
 * @typedef {( "Procedural" | "ProceduralAccount" | "ProceduralPersonal" )} FamilyKind
 * @type {{name:string, artist:string, kind:FamilyKind, draw:Function}}
 */
export const schema = {
  artist: "Your-Name",
  name: "Your-Designs-Name",
  draw,
  kind: "ProceduralPersonal",
};
