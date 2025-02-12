import { AlgorithmInfiniteGrid } from "@/components/AlgorithmInfiniteGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { useWorker } from "@/contexts/worker-context"
import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

export default function AlgorithmPage() {
  const { algorithmId } = useParams()

  const { artist } = useWorker()
  const { data: algorithm, isLoading } = useQuery({
    queryKey: ["algorithm", algorithmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .eq("id", algorithmId)
        .single()

      if (error) throw error
      if (data) {
        artist.updateAlgorithm(data.id, data.content)
      }
      return data as AlgorithmView
    },
    enabled: !!algorithmId,
  })

  if (isLoading) {
    return (
      <div className="mx-auto my-4">
        <Skeleton className="flex aspect-square w-full rounded-none" />
      </div>
    )
  }

  if (!algorithm) {
    return (
      <div className="mx-auto my-4">
        Algorithm does not exist or was deleted
      </div>
    )
  }

  return (
    <div className="relative my-4 h-[calc(100vh-8rem)]">
      <AlgorithmInfiniteGrid algorithm={algorithm} />
    </div>
  )
}
