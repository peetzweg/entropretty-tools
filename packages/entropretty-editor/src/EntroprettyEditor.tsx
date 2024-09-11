import { useEffect, useState } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import Exhibition from "./components/Exhibition";
import { useApp } from "./lib/state";

interface Props {
  worker: Worker;
}

export const EntroprettyEditor: React.FC<Props> = ({ worker }) => {
  const init = useApp((state) => state.init);
  const internalWorker = useApp((state) => state.worker);
  const currentSchema = useApp((state) => state.schema);

  useEffect(() => {
    init(worker);
  }, [init, worker]);

  if (!internalWorker) {
    console.log("Worker not set");
    return <div>Loading...</div>;
  }

  return (
    <main className="h-[101vh]">
      {currentSchema && <Exhibition schema={currentSchema} />}
      <Controls />
    </main>
  );
};
