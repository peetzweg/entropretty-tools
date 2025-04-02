import "@/globals.css"
import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AuthProvider } from "@/contexts/auth-context.tsx"
import { ServiceProvider } from "@/contexts/service-context.tsx"
import { HelmetProvider } from 'react-helmet-async'

import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HeaderLayout from "../layouts/HeaderLayout"

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  })



export const Route = createRootRoute({
  component: () => (
    <>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ServiceProvider>
        <AuthProvider>

            <Toaster />
      <HeaderLayout/>

        </AuthProvider>
      </ServiceProvider>
    </QueryClientProvider>
  </HelmetProvider>
      <TanStackRouterDevtools />
    </>
  ),
})


