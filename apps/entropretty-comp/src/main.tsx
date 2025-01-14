import "./globals.css"

import { createRoot } from "react-dom/client"
import Create from "./routes/Create.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./routes/Login.tsx"
import { AuthProvider } from "./contexts/auth-context.tsx"
import HeaderLayout from "./layouts/HeaderLayout.tsx"
import ExplorePage from "./routes/Explore.tsx"
import InspectPage from "./routes/Inspect.tsx"

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/a/:algorithmId" element={<InspectPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
)
