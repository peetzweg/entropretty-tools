import { afterAll, beforeAll, describe, expect, test } from "vitest"
import {
  PuppeteerSchemaDrawer,
  SchemaDrawer,
} from "../src/lib/PuppeteerSchemaDrawer"

const scriptPaths: string[] = process.env.VITEST_SCRIPT_PATH!.split(",")

describe.each(scriptPaths)("%s", (scriptPath) => {
  describe("drawing", () => {
    let drawer: SchemaDrawer | undefined = undefined

    beforeAll(async () => {
      drawer = new PuppeteerSchemaDrawer()
      await drawer.init(scriptPath, { size: 250 })
    })

    afterAll(async () => {
      await drawer?.deinit()
    })

    test("draws", async () => {
      const base64 = await drawer!.draw(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      )
      expect(base64).toBeDefined()
      console.log("base64", base64)
    })
  })
})
