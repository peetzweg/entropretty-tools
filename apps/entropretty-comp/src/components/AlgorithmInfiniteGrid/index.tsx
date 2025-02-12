import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { AlgorithmView } from "@/lib/helper.types"
import { deriveSeedFamily, getSeed, seedToKey } from "entropretty-utils"
import { useCallback, useEffect, useState } from "react"
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

  const reroll = useCallback(() => {
    const initial = getSeed(algorithm.family_kind!)
    const family = deriveSeedFamily(initial, 48)
    setSeeds(family.map((s) => [...s]))
  }, [algorithm.family_kind])

  useEffect(() => {
    reroll()
  }, [reroll])

  return (
    <div className="relative flex flex-col px-4">
      <div className={`flex w-full flex-col ${className} relative`}>
        <div className="h-full w-full p-4">
          <div className="mx-auto flex flex-wrap items-center justify-center">
            {seeds.map((seed) => (
              <AlgorithmBitmap
                key={seedToKey(seed)}
                algorithmId={algorithm.id!}
                seed={seed}
                size={150}
                scale={1.4}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Bottom Part */}
      <div className="absolute bottom-0 right-0 flex flex-col items-center justify-between gap-y-2 border-t border-gray-200 p-4 text-sm text-gray-600 md:flex-row">
        <AlgorithmInfo algorithm={algorithm} />
        <AlgorithmActions algorithm={algorithm} reroll={reroll} />
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

const AlgorithmActions = ({
  algorithm,
  reroll,
}: {
  algorithm: AlgorithmView
  reroll: () => void
}) => {
  const { user } = useAuth()

  return (
    <div className="flex w-full flex-row items-center justify-end gap-2 md:w-auto">
      <Button variant="ghost" onClick={reroll}>
        REROLL
      </Button>

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
