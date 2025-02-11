import { useWorker } from "@/contexts/worker-context"
import { AlgorithmView } from "@/lib/helper.types"
import { supabase } from "@/lib/supabase"
import { useInfiniteQuery } from "@tanstack/react-query"

const PAGE_SIZE = 2

export function useUserAlgorithms(userId: string | undefined) {
  const { artist } = useWorker()

  return useInfiniteQuery<AlgorithmView[]>({
    queryKey: ["algorithms", "user", userId],
    enabled: !!userId,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = (pageParam as number) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1

      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .range(from, to)

      if (data) {
        for (const algorithm of data) {
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
