import type { Remote } from "comlink";
import { useEffect } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import Exhibition from "./components/Exhibition";
import { useApp } from "./state";
import type { OffscreenCanvasWorker } from "./workers/offscreen-canvas-worker";
export type { Schema } from "./types";

interface Props {
  schemas: Array<string>;
  worker: Remote<OffscreenCanvasWorker>;
}

export const EntroprettyEditor: React.FC<Props> = ({ schemas, worker }) => {
  const setWorker = useApp((state) => state.setWorker);
  const internalWorker = useApp((state) => state.worker);

  useEffect(() => {
    setWorker(worker);
    worker.alive().then((res) => console.log(res));
  }, [setWorker, worker]);

  if (!internalWorker) {
    console.log("Worker not set");
    return <div>Loading...</div>;
  }

  return (
    <main className="h-[101vh]">
      <h1>Scripts</h1>
      <ol>
        {Object.entries(schemas).map(([name, schema]) => (
          <li key={name}>
            <h2>{schema}</h2>
            <p>{schema}</p>
          </li>
        ))}
      </ol>
      {schemas.length > 0 && <Exhibition schema={schemas[0]} />}
      <Controls />
    </main>
  );
};
