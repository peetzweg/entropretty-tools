import { createFileRoute } from '@tanstack/react-router'
import NewPage from '@/pages/Mine'

export const Route = createFileRoute('/signup')({
  component: NewPage,
})
