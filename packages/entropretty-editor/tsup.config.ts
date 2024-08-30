import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["./cli.ts"],
  format: ["esm"],
  outDir: "dist",
  clean: true,
});
