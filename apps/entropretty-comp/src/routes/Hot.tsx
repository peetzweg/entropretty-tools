import { createFileRoute } from '@tanstack/react-router'
import HotPage from '@/pages/Hot'

export const Route = createFileRoute('/hot')({
  component: HotPage,
})
