import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import { Database } from "../lib/database.types"
import { AlgorithmCard } from "../components/AlgorithmCard"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

export default function InspectPage() {
  const { algorithmId } = useParams()

  const { data: algorithm, isLoading } = useQuery({
    queryKey: ["algorithm", algorithmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .eq("id", algorithmId)
        .single()

      if (error) throw error
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
    <div className="mx-auto max-w-3xl p-6">
      <AlgorithmCard algorithm={algorithm} />
    </div>
  )
}
