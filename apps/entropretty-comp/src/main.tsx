import "@/globals.css"

import { AuthProvider } from "@/contexts/auth-context.tsx"
import { WorkerProvider } from "@/contexts/worker-context.tsx"
import HeaderLayout from "@/layouts/HeaderLayout.tsx"
import AlgorithmPage from "@/routes/Algorithm.tsx"
import Create from "@/routes/Create.tsx"
import LatestPage from "@/routes/Latest.tsx"
import Login from "@/routes/Login.tsx"
import UserPage from "@/routes/User.tsx"

import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import RequireUser from "./layouts/RequireUser"
import BestPage from "./routes/Best"
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
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route path="/" element={<BestPage />} />
              <Route path="/latest" element={<LatestPage />} />
              <Route path="/a/:algorithmId" element={<AlgorithmPage />} />
              <Route path="/u/:userId" element={<UserPage />} />
              <Route element={<RequireUser />}>
                <Route path="/create" element={<Create />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </WorkerProvider>
  </QueryClientProvider>,
)
