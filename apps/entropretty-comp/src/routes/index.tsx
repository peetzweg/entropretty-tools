import { createFileRoute } from '@tanstack/react-router'
import NewPage from '@/pages/New'

export const Route = createFileRoute('/')({
  component: NewPage,
})
