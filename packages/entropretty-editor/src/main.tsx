import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import type { OffscreenCanvasWorker } from "@/offscreen-canvas-worker";
import workerUrl from "@/offscreen-canvas-worker?worker&url";
import * as Comlink from "comlink";
const rawWorker = new Worker(workerUrl, { type: "module" });
export const offscreenWorker = Comlink.wrap(
  rawWorker
) as Comlink.Remote<OffscreenCanvasWorker>;

createRoot(document.getElementById("root")!).render(<App />);
