import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { AlgorithmView } from "@/lib/helper.types"
import { getSeedFamily, seedToKey } from "entropretty-utils"
import { DicesIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { Link } from "react-router"
import { DeleteButton } from "./DeleteButton"
import { LikeButton } from "./LikeButton"
import { useDisplaySizes } from "../../hooks/useDisplaySizes"

interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { user } = useAuth()
  const { single, grid } = useDisplaySizes()

  const [seedFamily, setSeedFamily] = useState<number[][]>([
    ...getSeedFamily("Procedural").map((s) => [...s]),
  ])
  const requestNewSeed = useCallback(() => {
    setSeedFamily([...getSeedFamily("Procedural").map((s) => [...s])])
  }, [])

  if (!algorithm.id) return null

  return (
    <div className="flex w-full flex-col border border-gray-200 bg-white">
      <div className="relative flex flex-col items-center justify-center gap-4 p-4 md:flex-row">
        <div className={`flex aspect-square items-center justify-center`}>
          <AlgorithmBitmap
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
                key={seedToKey(new Uint8Array(seed))}
                algorithmId={algorithm.id!}
                seed={seed}
                size={grid}
                scale={2}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-2 right-2 flex flex-row">
          <DeleteButton algorithm={algorithm} />
          <LikeButton algorithm={algorithm} />
          <Button variant={"ghost"} size={"icon"} onClick={requestNewSeed}>
            <DicesIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 p-4 text-sm text-gray-600">
        <div className="flex flex-col">
          <div>
            <span>{`${algorithm.name || "Untitled"}`} </span>
            {algorithm.remix_of && (
              <Link
                className="underline"
                to={`/a/${algorithm.remix_of}`}
              >{`remix of ${algorithm.remix_of}`}</Link>
            )}
          </div>
          <div>{`by ${algorithm.email || "Anonymous"}`}</div>
        </div>
        <div className="flex flex-row gap-2">
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

          <Button asChild variant="link">
            <Link
              to={`/a/${algorithm.id}`}
              className="text-gray-500 hover:text-gray-900"
            >
              {`/a/${algorithm.id}`}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
