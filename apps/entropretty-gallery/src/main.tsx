import "./globals.css"

import { createRoot } from "react-dom/client"
import Explore from "./routes/Explore.tsx"
import LandingPage from "./routes/LandingPage.tsx"

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"

function Root() {
  return (
    <>
      <Outlet />

      <ScrollRestoration />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Explore />,
      },
      {
        path: "/tools",
        element: <LandingPage />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
)
