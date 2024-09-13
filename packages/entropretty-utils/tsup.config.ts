import { defineConfig } from "tsup"

export default defineConfig({
  entryPoints: ["./src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
  // experimentalDts: true,
  dts: true,
  // external: ["prando"],
})
