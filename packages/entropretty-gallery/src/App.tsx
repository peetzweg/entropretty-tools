import { EntroprettyEditor } from "entropretty-editor";

import { wrap } from "comlink";
import Worker from "./worker?worker";
import { useEffect, useState } from "react";
export const worker = wrap(new Worker());

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
