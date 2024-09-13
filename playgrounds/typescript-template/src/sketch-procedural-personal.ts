import { DrawFn, Schema } from "entropretty-editor"
import { numeric } from "entropretty-utils"
/**
 * This is a draw function you need to fill.
 * It should draw a design based on the seed.
 * The seed is an array of bytes.
 * You can treat as as in Array of numbers between 0-255.
 * Depending on the FamilyKind you specify in the schema,
 * the seed will be either 4, 8 or 32 bytes long.
 */
const draw: DrawFn = (ctx, seed) => {
  const size = 90
  const personalId = numeric(seed).toString()
  ctx.strokeStyle = ""
  ctx.fillStyle = "black"
  ctx.textAlign = "center"
  ctx.textBaseline = "bottom"
  ctx.font = size / 3 + "px serif"
  ctx.translate(0, size / 3)
  ctx.fillText(personalId, size / 2, size / 3, size)
}

/**
 * This is the schema of your design. It informs the user of about metadata of the design.
 *
 * Procedural: The seed are 4 random bytes.
 * ProceduralPersonal: The seed is u32 number, representing a citizenship number.
 * ProceduralAccount: The seed is a 32 bytes public key.
 */
export const schema: Schema = {
  artist: "Your-Name",
  name: "final_v1",
  draw,
  kind: "ProceduralPersonal", // Try changing this to "Procedural" or "ProceduralAccount" to explore how the seed changes
}
