import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

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

export default defineConfig({
  plugins: [...pluginsWithReactCompiler],
  build: {
    target: "esnext",
  },
  worker: {
    format: "es",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
