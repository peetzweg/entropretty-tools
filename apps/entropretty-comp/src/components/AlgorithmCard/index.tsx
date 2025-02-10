import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { AlgorithmView } from "@/lib/helper.types"
import { getSeedFamily, seedToKey } from "entropretty-utils"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { Link } from "react-router"
import { useDisplaySizes } from "../../hooks/useDisplaySizes"
import { LikeButton } from "./LikeButton"

interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { single, grid } = useDisplaySizes()

  const [seedFamily, setSeedFamily] = useState<number[][]>([
    ...getSeedFamily(algorithm.family_kind!).map((s) => [...s]),
  ])

  if (!algorithm.id) return null

  return (
    <div className="flex w-full flex-col border border-gray-200 bg-white">
      <div className="relative flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
        <div className={`flex aspect-square items-center justify-center`}>
          <AlgorithmBitmap
            key={seedToKey(seedFamily[0])}
            algorithmId={algorithm.id}
            seed={seedFamily[0]}
            size={single}
            scale={2}
          />
        </div>

        <div className={`flex h-full w-full items-center justify-center`}>
          <div className="grid grid-cols-3 items-center justify-center gap-4">
            {seedFamily.slice(0, 9).map((seed) => (
              <AlgorithmBitmap
                key={seedToKey(seed)}
                algorithmId={algorithm.id!}
                seed={seed}
                size={grid}
                scale={2}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 flex flex-row"></div>
      </div>

      {/* Bottom Part */}
      <div className="flex flex-col items-center justify-between gap-y-2 border-t border-gray-200 p-4 text-sm text-gray-600 md:flex-row">
        <AlgorithmInfo algorithm={algorithm} />

        <AlgorithmActions algorithm={algorithm} setSeedFamily={setSeedFamily} />
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
  setSeedFamily,
}: {
  algorithm: AlgorithmView
  setSeedFamily: Dispatch<SetStateAction<number[][]>>
}) => {
  const { user } = useAuth()
  const reroll = useCallback(() => {
    setSeedFamily([...getSeedFamily(algorithm.family_kind!).map((s) => [...s])])
  }, [algorithm.family_kind, setSeedFamily])

  return (
    <div className="flex w-full flex-row items-center justify-end gap-2 md:w-auto">
      {/* <DeleteButton algorithm={algorithm} /> */}

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
