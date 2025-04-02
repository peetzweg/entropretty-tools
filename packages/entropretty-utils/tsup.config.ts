import { defineConfig } from "tsup"

export default defineConfig({
  entryPoints: ["./src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  dts: true,
  keepNames: true,
  name: "entropretty-utils",
})
