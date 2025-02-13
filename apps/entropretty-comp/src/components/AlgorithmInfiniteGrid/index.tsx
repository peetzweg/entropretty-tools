import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { AlgorithmView } from "@/lib/helper.types"
import { deriveSeedFamily, getSeed, seedToKey } from "entropretty-utils"
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router"
import { LikeButton } from "../AlgorithmCard/LikeButton"

interface AlgorithmInfiniteGridProps {
  algorithm: AlgorithmView
  className?: string
}

export function AlgorithmInfiniteGrid({
  algorithm,
  className = "",
}: AlgorithmInfiniteGridProps) {
  const [seeds, setSeeds] = useState<number[][]>([])
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "400px", // Start loading more content before reaching the bottom
  })

  useEffect(() => {
    const initial = getSeed(algorithm.family_kind!)
    const family = deriveSeedFamily(initial, {
      size: 48,
      minBits: 1,
      maxBits: 1,
    })

    // Convert to array of unique seeds
    const uniqueSeeds = Array.from(
      new Set(family.map((seed) => seedToKey(seed))),
    )
      .map((key) => family.find((seed) => seedToKey(seed) === key)!)
      .map((s) => [...s])

    setSeeds(uniqueSeeds)
  }, [algorithm.family_kind])

  const loadMore = useCallback(() => {
    if (seeds.length === 0) return

    const lastSeed = new Uint8Array(seeds[seeds.length - 1])
    const newFamily = deriveSeedFamily(lastSeed, {
      size: 24,
      minBits: 1,
      maxBits: 1,
    })

    // Filter out any duplicates by converting to string for comparison
    const existingKeys = new Set(seeds.map((seed) => seedToKey(seed)))
    const uniqueNewSeeds = newFamily.filter(
      (seed) => !existingKeys.has(seedToKey([...seed])),
    )

    setSeeds((prev) => [...prev, ...uniqueNewSeeds.map((s) => [...s])])
  }, [seeds])

  useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView, loadMore])

  return (
    <div className="relative flex flex-col px-4">
      <div className={`flex w-full flex-col ${className} relative`}>
        <div className="h-full w-full p-4">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-1">
            {seeds.map((seed) => (
              <AlgorithmBitmap
                key={seedToKey(seed)}
                algorithmId={algorithm.id!}
                seed={seed}
                size={200}
                scale={2}
              />
            ))}
            {/* Loading trigger */}
            <div ref={ref} className="h-4 w-full" />
          </div>
        </div>
        <div className="bg-background flow-col fixed bottom-4 right-4 flex flex-col items-center justify-center gap-8 gap-y-2 border border-gray-200 p-4 text-gray-600 md:flex-row md:justify-between">
          <AlgorithmInfo algorithm={algorithm} />
          <AlgorithmActions algorithm={algorithm} />
        </div>
      </div>
    </div>
  )
}

const AlgorithmInfo = ({ algorithm }: { algorithm: AlgorithmView }) => {
  return (
    <div className="flex flex-col">
      <div>
        <span>
          {`${algorithm.name || "Untitled"} `}
          <Link
            className="text-muted-foreground underline"
            to={`/a/${algorithm.id}`}
          >{`/a/${algorithm.id}`}</Link>
        </span>

        {algorithm.remix_of && (
          <>
            {` remix of `}
            <Link
              className="text-muted-foreground underline"
              to={`/a/${algorithm.remix_of}`}
            >{`/a/${algorithm.remix_of}`}</Link>
          </>
        )}
      </div>
      <div>{`by ${algorithm.email || "Anonymous"}`}</div>
    </div>
  )
}

const AlgorithmActions = ({ algorithm }: { algorithm: AlgorithmView }) => {
  const { user } = useAuth()

  return (
    <div className="flex w-full flex-row items-center justify-end gap-2 md:w-auto">
      {user && (
        <Button asChild variant="link">
          <Link
            to={`/create?remix=${algorithm.id}`}
            className="text-gray-500 hover:text-gray-900"
          >
            {`REMIX`}
          </Link>
        </Button>
      )}

      <LikeButton algorithm={algorithm} />
    </div>
  )
}
