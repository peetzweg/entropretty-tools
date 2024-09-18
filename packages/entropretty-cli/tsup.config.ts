import { defineConfig } from "tsup"

export default defineConfig({
  entryPoints: ["./src/cli.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  publicDir: "./tests",
})
