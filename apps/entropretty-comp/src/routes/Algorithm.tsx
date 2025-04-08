import { AlgorithmInfiniteGrid } from "@/components/AlgorithmInfiniteGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { useAlgorithmService } from "@/contexts/service-context"
import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import { useDisplaySizes } from "../hooks/useDisplaySizes"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_profile"]["Row"]

export default function AlgorithmPage() {
  const { algorithmId } = useParams()
  const algorithmService = useAlgorithmService()
  const { infinite } = useDisplaySizes()

  const { data: algorithm, isLoading } = useQuery<AlgorithmView>({
    queryKey: ["algorithm", algorithmId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_profile")
        .select()
        .eq("id", Number(algorithmId))
        .single()

      if (error) throw error
      if (!data) throw new Error("Algorithm not found")

      algorithmService.addAlgorithm(data.id!, data.content!)

      return data
    },
  })

  if (isLoading) {
    return (
      <div className="h-full w-full p-4">
        <div className="flex flex-col gap-4 p-0 sm:p-8">
          <div className="mx-auto flex w-full flex-wrap items-center justify-evenly gap-4 sm:gap-16">
            {Array(48)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  style={{ width: infinite, height: infinite }}
                  className={`aspect-square rounded-none`}
                />
              ))}
          </div>
        </div>
      </div>
    )
  }

  if (!algorithm) {
    return <div>Algorithm not found</div>
  }

  return (
    <div className="flex flex-col gap-4 p-0 sm:p-8">
      <AlgorithmInfiniteGrid algorithm={algorithm} />
    </div>
  )
}
