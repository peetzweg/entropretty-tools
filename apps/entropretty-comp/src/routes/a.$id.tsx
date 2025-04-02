import { createFileRoute } from '@tanstack/react-router'
import AlgorithmPage from '@/pages/Algorithm'


export const Route = createFileRoute('/a/$id')({

  component: PostComponent,

})

function PostComponent() {
  const { id } = Route.useParams()
  return <AlgorithmPage algorithmId={id} />
}
