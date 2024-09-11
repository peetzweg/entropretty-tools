import { EntroprettyEditor } from "entropretty-editor";

import Worker from "./worker?worker&inline";
export const worker = new Worker();

function App() {
  return (
    <>
      <EntroprettyEditor worker={worker} />
    </>
  );
}

export default App;
