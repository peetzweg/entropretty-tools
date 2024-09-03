import { wrap } from "comlink";
import type { Remote } from "comlink";
import "./App.css";
import { Controls } from "./components/Controls";
import Exhibition from "./components/Exhibition";
import type { OffscreenCanvasWorker } from "./workers/offscreen-canvas-worker";
import workerUrl from "./workers/offscreen-canvas-worker?worker&url";

const rawWorker = new Worker(workerUrl, { type: "module" });
export const offscreenWorker = wrap(rawWorker) as Remote<OffscreenCanvasWorker>;

function App() {
  return (
    <main className="h-[101vh]">
      <Exhibition />
      <Controls />
    </main>
  );
}

export default App;
