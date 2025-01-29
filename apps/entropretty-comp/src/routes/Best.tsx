import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { AlgorithmCard } from "@/components/AlgorithmCard"
import { useBestAlgorithms } from "@/hooks/useBestAlgorithms"
import { AlgorithmCardSkeleton } from "@/components/AlgorithmCard/AlgorithmCardSkeleton"

export default function BestPage() {
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBestAlgorithms()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="mx-auto my-4">
        <div className="space-y-4">
          <AlgorithmCardSkeleton />
          <AlgorithmCardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto my-4">
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
            <div>No more rated algorithms</div>
          )}
        </div>
      </div>
    </div>
  )
}
