import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'


const ReactCompilerConfig = {
  /* ... */
}

const pluginsWithReactCompiler = [
  TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
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
