import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  entryPoints: ["./src/cli.ts"],
  format: ["esm"],
  outDir: "dist",
})
