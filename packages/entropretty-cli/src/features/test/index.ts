import fs from "node:fs/promises"
import path, { basename } from "node:path"
import pc from "picocolors"
import { PuppeteerSchemaDrawer } from "./PuppeteerSchemaDrawer"

export default async function run(scriptPath: string) {
  const __cwd = process.cwd()

  const testFolder = path.join(
    __cwd,
    ".entropretty",
    "test",
    basename(scriptPath, ".js"),
  )
  console.log("removing")
  await fs.rm(testFolder, { recursive: true, force: true })
  console.log("creating")
  await fs.mkdir(testFolder, { recursive: true })

  console.log(pc.cyan(`under test '${scriptPath}'`))
  const schemaDrawer = await new PuppeteerSchemaDrawer()
  try {
    const startTime = Date.now()
    console.time("init")
    await schemaDrawer.init(scriptPath, { size: 500 })
    console.timeEnd("init")
    const seeds = [
      [10, 20, 30, 40],
      [1, 2, 3, 4],
      [100, 200, 150, 250],
      [0, 0, 0, 0],
    ]

    for (const seed of seeds) {
      console.time("draw")
      const pngData = await schemaDrawer.draw(new Uint8Array(seed))
      console.timeEnd("draw")
      console.time("write")
      await fs.writeFile(
        path.join(testFolder, `${seed.join("-")}.png`),
        Buffer.from(pngData, "base64"),
      )
      console.timeEnd("write")
    }

    const endTime = Date.now()

    const time = endTime - startTime
    console.log(pc.green(`test completed in ${time}ms\n`))
  } catch (e) {
    console.error(pc.red(`failed to test ${scriptPath}`))
    console.error(e)
  } finally {
    schemaDrawer.deinit()
  }
}
