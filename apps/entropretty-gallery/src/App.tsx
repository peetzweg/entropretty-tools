import { EntroprettyEditor } from "entropretty-editor";

import Worker from "./worker?worker";
import { wrap } from "comlink";
import { useEffect } from "react";
export const worker = new Worker();

function App() {
  return (
    <>
      <h1>Gallery</h1>
      <EntroprettyEditor worker={worker} />
    </>
  );
}

const SchemaSelect = () => {
  useEffect(() => {
    wrap(worker)
      .init()
      .then((schemas: string[]) => {
        console.log(schemas);
      });
  }, []);
  return null;
};

export default App;
