import { EntroprettyEditor } from "entropretty-editor";

import Worker from "./worker?worker";
export const worker = new Worker();

function App() {
  return (
    <>
      <h1>Gallery</h1>
      <EntroprettyEditor worker={worker} />
    </>
  );
}

export default App;
