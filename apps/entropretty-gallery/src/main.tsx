import "entropretty-editor/style.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Gallery</h1>
    <App />
  </StrictMode>
);
