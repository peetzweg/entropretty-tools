import "./globals.css"

import { createRoot } from "react-dom/client"
import Explore from "./routes/Explore.tsx"
import LandingPage from "./routes/LandingPage.tsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
)
