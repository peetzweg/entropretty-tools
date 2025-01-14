import "./globals.css"

import { createRoot } from "react-dom/client"
import Create from "./routes/Create.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Create />,
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
)
