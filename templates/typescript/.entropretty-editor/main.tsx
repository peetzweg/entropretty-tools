
import "entropretty-editor/style.css";
import { EntroprettyEditor } from "entropretty-editor";
import { createRoot } from "react-dom/client";
import Worker from "./worker?worker";

export const worker = new Worker();

function App() {
  return (
    <>
      <h1>Sketch</h1>
      <EntroprettyEditor worker={worker} />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
