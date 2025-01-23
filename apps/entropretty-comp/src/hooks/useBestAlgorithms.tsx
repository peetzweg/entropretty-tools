import { useWorker } from "@/contexts/worker-context"
import { supabase } from "@/lib/supabase"
import { useInfiniteQuery } from "@tanstack/react-query"
import { AlgorithmView } from "@/lib/helper.types"

const PAGE_SIZE = 2

export function useBestAlgorithms() {
  const { artist } = useWorker()

  return useInfiniteQuery<AlgorithmView[]>({
    queryKey: ["best-algorithms"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = (pageParam as number) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .order("like_count", { ascending: false })
        .gt("like_count", 0)
        .range(from, to)

      if (data) {
        for (const algorithm of data) {
          console.log("Updating", algorithm.id)
          artist.updateAlgorithm(algorithm.id, algorithm.content)
        }
      }

      if (error) throw error
      return data as AlgorithmView[]
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined
    },
  })
}
