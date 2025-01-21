import { Button } from "@/components/ui/button"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { Link } from "react-router"
import { AlgorithmView } from "../lib/helper.types"
import { useAuth } from "../contexts/auth-context"
import { useCallback, useState } from "react"
import { DicesIcon } from "lucide-react"
import { getSeed } from "entropretty-utils"
interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { user } = useAuth()
  const [seed, setSeed] = useState<number[]>([...getSeed("Procedural")])
  const requestNewSeed = useCallback(() => {
    setSeed([...getSeed("Procedural")])
  }, [])

  if (!algorithm.id) return null

  return (
    <div className="flex w-full flex-col border border-gray-200 bg-white">
      <div className="relative flex aspect-square h-full w-full items-center justify-center">
        <AlgorithmBitmap
          algorithmId={algorithm.id}
          seed={seed}
          size={512}
          scale={2}
        />
        <div className="absolute bottom-2 right-2">
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
