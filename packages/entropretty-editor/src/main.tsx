import { createRoot } from "react-dom/client";
import { EntroprettyEditor } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <EntroprettyEditor schemas={[]} worker={{} as any} />
);
