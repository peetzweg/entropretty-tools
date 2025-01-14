import { useInfiniteQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import { Database } from "../lib/database.types"
import { AlgorithmCard } from "../components/AlgorithmCard"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

const PAGE_SIZE = 2

export default function ExplorePage() {
  // Set up intersection observer to detect when we reach bottom of the list
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AlgorithmView[]>({
      queryKey: ["latest-algorithms"],
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const from = pageParam * PAGE_SIZE
        const to = from + PAGE_SIZE - 1

        const { data, error } = await supabase
          .from("algorithms_with_user_info")
          .select()
          .order("created_at", { ascending: false })
          .range(from, to)

        if (error) throw error
        return data as AlgorithmView[]
      },
      getNextPageParam: (lastPage, allPages) => {
        // If the last page has fewer items than PAGE_SIZE, we've reached the end
        return lastPage.length === PAGE_SIZE ? allPages.length : undefined
      },
    })

  // Fetch next page when the last item comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Latest Algorithms</h1>
      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          )),
        )}

        {/* Loading indicator */}
        <div ref={ref} className="py-4 text-center">
          {isFetchingNextPage ? (
            <div>Loading more...</div>
          ) : hasNextPage ? (
            <div>Load more</div>
          ) : (
            <div>No more algorithms</div>
          )}
        </div>
      </div>
    </div>
  )
}
