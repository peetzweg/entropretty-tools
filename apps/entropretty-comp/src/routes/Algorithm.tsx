import { AlgorithmInfiniteGrid } from "@/components/AlgorithmInfiniteGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { useAlgorithmService } from "@/contexts/service-context"
import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_profile"]["Row"]

export default function AlgorithmPage() {
  const { algorithmId } = useParams()
  const algorithmService = useAlgorithmService()

  const { data: algorithm, isLoading } = useQuery<AlgorithmView>({
    queryKey: ["algorithm", algorithmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_profile")
        .select()
        .eq("id", algorithmId)
        .single()

      if (error) throw error
      if (!data) throw new Error("Algorithm not found")

      algorithmService.updateAlgorithm(data.id, data.content)

      return data
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-3 gap-4">
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
        </div>
      </div>
    )
  }

  if (!algorithm) {
    return <div>Algorithm not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">{algorithm.name}</h1>
      <div className="text-lg">by {algorithm.username}</div>
      <AlgorithmInfiniteGrid algorithm={algorithm} />
    </div>
  )
}
