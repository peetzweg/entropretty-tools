import { AlgorithmCardSkeleton } from "@/components/AlgorithmCard/AlgorithmCardSkeleton"
import { useLatestAlgorithms } from "@/hooks/useLatestAlgorithms"
import { getSeed, seedToKey } from "entropretty-utils"
import { useEffect, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { AlgorithmBitmap } from "../features/create/AlgorithmBitmap"
import { Link } from "react-router"
import { useDisplaySizes } from "../hooks/useDisplaySizes"

function Gallery() {
  const { ref, inView } = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLatestAlgorithms()

  const { grid } = useDisplaySizes()

  const seeds = useMemo(() => {
    return {
      Procedural: getSeed("Procedural"),
      ProceduralPersonal: getSeed("ProceduralPersonal"),
      ProceduralAccount: getSeed("ProceduralAccount"),
    }
  }, [])

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
    <div className="flex flex-row flex-wrap gap-4">
      {data?.pages.map((page) =>
        page.map((algorithm) => (
          <Link to={`/a/${algorithm.id}`}>
            <AlgorithmBitmap
              key={seedToKey(seeds[algorithm.family_kind!])}
              algorithmId={algorithm.id!}
              seed={seeds[algorithm.family_kind!] as number[]}
              size={grid}
              scale={2}
            />
          </Link>
        )),
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div className="mx-auto my-4">
      <div className="space-y-4">
        <Gallery />
      </div>
    </div>
  )
}
