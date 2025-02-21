import { AlgorithmCard } from "@/components/AlgorithmCard"
import { AlgorithmCardSkeleton } from "@/components/AlgorithmCard/AlgorithmCardSkeleton"
import { FamilyKindFilter } from "@/components/FamilyKindFilter"
import { useHotAlgorithms } from "@/hooks/useHotAlgorithms"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { WinterAssemblyPromotionCard } from "../components/WinterAssemblyPromotionCard"

function Feed() {
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHotAlgorithms()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <AlgorithmCardSkeleton />
        <AlgorithmCardSkeleton />
      </div>
    )
  }

  return (
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
  )
}

export default function HotPage() {
  return (
    <div className="mx-auto my-4">
      <div className="space-y-4">
        <WinterAssemblyPromotionCard />
        <FamilyKindFilter />
        <Feed />
      </div>
    </div>
  )
}
