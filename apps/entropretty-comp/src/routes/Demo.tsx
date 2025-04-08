import { Skeleton } from "@/components/ui/skeleton"
import { useAlgorithmService } from "@/contexts/service-context"
import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { AlgorithmDemo } from "../components/AlgorithmDemo"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_profile"]["Row"]

export default function DemoPage() {
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

      algorithmService.addAlgorithm(data.id, data.content)

      return data
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
        <Skeleton className={`aspect-square h-[70vh] w-[70vh]`} />
      </div>
    )
  }

  if (!algorithm) {
    return <div>Algorithm not found</div>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <AlgorithmDemo algorithm={algorithm} />
    </div>
  )
}
