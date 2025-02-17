import "@/globals.css"

import { AuthProvider } from "@/contexts/auth-context.tsx"
import { WorkerProvider } from "@/contexts/worker-context.tsx"
import HeaderLayout from "@/layouts/HeaderLayout.tsx"
import AlgorithmPage from "@/routes/Algorithm.tsx"
import LatestPage from "@/routes/Latest.tsx"
import Login from "@/routes/Login.tsx"
import SignUp from "@/routes/SignUp.tsx"
import UserPage from "@/routes/User.tsx"
import MinePage from "@/routes/Mine.tsx"
import { Suspense, lazy } from "react"

import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import RequireUser from "./layouts/RequireUser"
import HotPage from "./routes/Hot"
import ScrollToTop from "@/components/ScrollToTop"
const Create = lazy(() => import("@/routes/Create"))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <WorkerProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <ScrollToTop />
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route path="/" element={<LatestPage />} />
              <Route path="/hot" element={<HotPage />} />
              <Route path="/a/:algorithmId" element={<AlgorithmPage />} />
              <Route path="/u/:username" element={<UserPage />} />
              <Route element={<RequireUser />}>
                <Route path="/mine" element={<MinePage />} />
                <Route
                  path="/create"
                  element={
                    <Suspense
                      fallback={<div className="p-8">Loading editor...</div>}
                    >
                      <Create />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </WorkerProvider>
  </QueryClientProvider>,
)
