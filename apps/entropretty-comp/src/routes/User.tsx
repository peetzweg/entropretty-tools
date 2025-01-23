import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useParams } from "react-router"
import { AlgorithmCard } from "@/components/AlgorithmCard"
import { useUserAlgorithms } from "@/hooks/useUserAlgorithms"

export default function UserPage() {
  const { userId } = useParams()
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserAlgorithms(userId)

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  // Redirect if not logged in
  if (!userId) {
    return <div>No user with id {userId} found</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto my-4 max-w-xl">
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
