import { createFileRoute } from '@tanstack/react-router'
import MinePage from '@/pages/Mine'

export const Route = createFileRoute('/mine')({
  component: MinePage,
})
