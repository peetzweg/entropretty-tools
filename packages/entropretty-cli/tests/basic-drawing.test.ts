import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { PuppeteerSchemaDrawer, SchemaDrawer } from "entropretty-cli"

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

    test("is deterministic", async () => {
      const seeds = [
        new Uint8Array([11, 22, 33, 44, 55, 66, 77, 88]),
        new Uint8Array([99, 100, 101, 102, 103, 104, 105, 106]),
      ]

      const firstRun = await drawer!.draw(seeds[0])
      const secondRun = await drawer!.draw(seeds[0])
      expect(firstRun).toEqual(secondRun)
    })
  })
})
