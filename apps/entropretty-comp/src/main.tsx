import "./globals.css"

import { createRoot } from "react-dom/client"
import Create from "./routes/Create.tsx"

import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./routes/Login.tsx"
import { AuthProvider } from "./contexts/auth-context.tsx"
import HeaderLayout from "./layouts/HeaderLayout.tsx"
import ExplorePage from "./routes/Explore.tsx"

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/create" element={<Create />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
)
