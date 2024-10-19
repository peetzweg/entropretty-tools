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
import Login from "./routes/Login.tsx"
import AuthCallback from "./routes/AuthCallback.tsx"
import Submit from "./routes/Submit.tsx"

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
      {
        path: "/submit",
        element: <Submit />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/auth-callback",
        element: <AuthCallback />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
)
