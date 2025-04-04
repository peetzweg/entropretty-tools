import { createFileRoute } from '@tanstack/react-router'
import NewPage from './New'

export const Route = createFileRoute('/')({
  component: NewPage,
})
