#!/usr/bin/env node
import cac from "cac";
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

async function  startServer(script){
    fs.symlink
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    const __cwd = process.cwd();

    const relative = path.relative( __dirname,__cwd)

    const fullPath = path.join(__cwd, script)
    console.log({__dirname, __cwd,relative,script, fullPath})

    const server = await createServer({
        define: {
          __SCRIPTS__: [fullPath],
        },
        configFile: __dirname+ "./vite.config.ts",
        root: __dirname,
        server: {
          port: 4242,
        },
      })
      await server.listen()

      server.printUrls()
      server.bindCLIShortcuts({ print: true })
}

const cli = cac("pop");

cli
  .command("dev <script>", "open editor with given script")
  .action(async (script, options) => {
    await startServer(script);
  });
cli.help();

try {
  // Parse CLI args without running the command
  console.log(process.argv);
  cli.parse(process.argv, { run: false });
  // Run the command yourself
  // You only need `await` when your command action returns a Promise
  await cli.runMatchedCommand();

} catch (error) {
  if (error instanceof Error) console.error(error.message);
  else {
    console.error(error);
  }

  process.exit(1);
}
