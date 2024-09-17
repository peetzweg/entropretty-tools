import fs from "node:fs/promises"
import path, { basename } from "node:path"
import pc from "picocolors"
import { startVitest } from "vitest/node"

export default async function run(scriptPath: string) {
  const __cwd = process.cwd()

  const scriptName = basename(scriptPath, ".js")
  const testFolder = path.join(
    __cwd,
    ".entropretty",
    "test",
    basename(scriptPath, ".js"),
  )

  const testsFolder = path.join(__cwd, "node_modules/entropretty-cli")

  await fs.rm(testFolder, { recursive: true, force: true })
  await fs.mkdir(testFolder, { recursive: true })

  try {
    const vitest = await startVitest("test", ["basic"], {
      watch: false,
      dir: testsFolder,
      run: true,
      env: {
        VITEST_SCRIPT_NAME: scriptName,
        VITEST_SCRIPT_PATH: scriptPath,
      },
    })
    await vitest?.close()
  } catch (e) {
    console.error(pc.red(`failed to test ${scriptPath}`))
    console.error(e)
  }
}
