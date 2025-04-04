import { createFileRoute } from '@tanstack/react-router'
import CreatePage from '@/pages/Create'
import { z } from 'zod'
import { FamilyKind } from 'entropretty-utils'


const createSearchSchema = z.object({
  remix: z.string().optional(),
  seedType: z.string().optional(),

})



export const Route = createFileRoute('/create')({
  component: CreateComponent,
  validateSearch: (search) => createSearchSchema.parse(search),
})

function CreateComponent() {
  const { remix, seedType } = Route.useSearch()
  return <CreatePage remixId={remix} seedType={seedType as FamilyKind || undefined}/>
}
