import type { Schema } from "entropretty-editor";
import { EntroprettyEditor } from "entropretty-editor";
import { useEffect, useState } from "react";

import Worker from "./worker?worker";
import { Remote, wrap } from "comlink";
import { OffscreenCanvasWorker } from "./worker";

export const worker = wrap(new Worker()) as Remote<OffscreenCanvasWorker>;

function App() {
  const [schemas, setSchemas] = useState<string[]>([]);

  useEffect(() => {
    const SCHEMAS = import.meta.glob("../schemas/*.js");
    console.log({ SCHEMAS });
    worker.init().then((schemas) => {
      console.log({ schemas });
      setSchemas(schemas);
      console.log("complete");
    });
  }, []);

  return (
    <>
      <EntroprettyEditor worker={worker} schemas={schemas} />
    </>
  );
}

export default App;
