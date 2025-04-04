import { createFileRoute } from '@tanstack/react-router'
import UserPage from '@/pages/User'

export const Route = createFileRoute('/u/$username')({
  component: PostComponent,
})

function PostComponent() {
  const { username } = Route.useParams()
  return (
    <UserPage username={username} />
  )
}
