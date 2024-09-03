import "./App.css";
import { Controls } from "./components/Controls";
import Exhibition from "./components/Exhibition";

function App() {
  return (
    <main className="h-[101vh]">
      <Exhibition />
      <Controls />
    </main>
  );
}

export default App;
