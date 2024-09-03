#!/usr/bin/env node
import cac from "cac";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

const index_html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Entropretty Editor</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`;
const main_tsx = `
import { createRoot } from "react-dom/client";
import App from "entropretty-editor/src/App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
`;

async function startServer(script: string) {
  const __dirname = fileURLToPath(new URL(".", import.meta.url));
  const __cwd = process.cwd();

  const relative = path.relative(__dirname, __cwd);

  const fullPath = path.join(__cwd, script);
  console.log({ __dirname, __cwd, relative, script, fullPath });

  process.env.VITE_SCRIPTS = fullPath;

  const appPath = path.join(__cwd, ".entropretty-editor");
  await fs.rm(appPath, { recursive: true, force: true });
  await fs.mkdir(appPath);
  await fs.writeFile(path.join(appPath, "index.html"), index_html);
  await fs.writeFile(path.join(appPath, "main.tsx"), main_tsx);
  const server = await createServer({
    define: {
      __SCRIPTS__: [fullPath],
    },
    configFile: __dirname + "../vite.config.ts",
    root: appPath,
    mode: "development",
    css: {
      postcss: {
        plugins: [
          tailwind({
            config: path.join(__dirname, "../tailwind.config.js"),
          }),
          autoprefixer(),
        ],
      },
    },
    server: {
      port: 4242,
    },
  });
  await server.listen();

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}

const cli = cac("entropretty");

cli
  .command("dev <script>", "open editor with given script")
  .action(async (script) => {
    await startServer(script);
  });

cli
  // Simply omit the command name, just brackets
  .command("[...args]", "Build files")
  .action(() => {
    cli.outputHelp();
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
