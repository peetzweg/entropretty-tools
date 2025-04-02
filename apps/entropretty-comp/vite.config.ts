import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"

const ReactCompilerConfig = {
  /* ... */
}

const pluginsWithReactCompiler = [
  react({
    babel: {
      plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
    },
  }),
]

// import reactSwc from "@vitejs/plugin-react-swc"
// const pluginsWithSWC = [reactSwc()]

export default defineConfig(({ mode }) => ({
  plugins: [
    ...pluginsWithReactCompiler,
    mode === "analyze" &&
      visualizer({
        open: true,
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
      }),
  ],
  build: {
    target: "esnext",
    sourcemap: mode === "analyze",
    esbuild: {
      minifyIdentifiers: false, // <- stops name mangling
      minifySyntax: true,
      minifyWhitespace: true,
    },
  },
  worker: {
    format: "es",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
