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
import Login from "./components/Account.tsx"
import AuthCallback from "./routes/AuthCallback.tsx"
import Submit from "./routes/Submit.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />

      <ScrollRestoration />
    </QueryClientProvider>
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
        path: "/auth-callback",
        element: <AuthCallback />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
)
