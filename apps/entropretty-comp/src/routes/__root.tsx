import "@/globals.css"
import { createRootRoute, HeadContent } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { AuthProvider } from "@/contexts/auth-context.tsx"
import { ServiceProvider } from "@/contexts/service-context.tsx"
import { HelmetProvider } from "react-helmet-async"

import { Toaster } from "@/components/ui/sonner"
import HeaderLayout from "../layouts/HeaderLayout"

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <HelmetProvider>
        <ServiceProvider>
          <AuthProvider>
            <Toaster />
            <HeaderLayout />
          </AuthProvider>
        </ServiceProvider>
      </HelmetProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
