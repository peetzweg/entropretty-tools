import { useEffect, useState } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import Exhibition from "./components/Exhibition";
import { useApp } from "./state";

interface Props {
  worker: Worker;
}

export const EntroprettyEditor: React.FC<Props> = ({ worker }) => {
  const setWorker = useApp((state) => state.setWorker);
  const internalWorker = useApp((state) => state.worker);
  const [schemas, setSchemas] = useState<string[]>([]);

  useEffect(() => {
    setWorker(worker);
  }, [setWorker, worker]);

  useEffect(() => {
    if (!internalWorker) return;

    internalWorker.init().then((schemas) => {
      console.log({ schemas });
      setSchemas(schemas);
      console.log("complete from entropretty-editor");
    });
  }, [internalWorker]);

  if (!internalWorker) {
    console.log("Worker not set");
    return <div>Loading...</div>;
  }

  return (
    <main className="h-[101vh]">
      {schemas.length > 0 && <Exhibition schema={schemas[0]} />}
      <Controls />
    </main>
  );
};
