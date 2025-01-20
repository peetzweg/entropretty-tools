import { AlgorithmCard } from "@/components/AlgorithmCard"
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
    return <div>Loading...</div>
  }

  if (!algorithm) {
    return <div>Algorithm not found</div>
  }

  return (
    <div className="mx-auto my-4 max-w-xl">
      <AlgorithmCard algorithm={algorithm} />
    </div>
  )
}
