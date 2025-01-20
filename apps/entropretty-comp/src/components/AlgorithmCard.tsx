import { Button } from "@/components/ui/button"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { Link } from "react-router"
import { AlgorithmView } from "../lib/helper.types"
import { useAuth } from "../contexts/auth-context"

interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { user } = useAuth()
  if (!algorithm.id) return null

  return (
    <div className="flex w-full flex-col border border-gray-200 bg-white">
      <div className="flex aspect-square h-full w-full items-center justify-center">
        <AlgorithmBitmap
          algorithmId={algorithm.id}
          seed={new Uint8Array([1, 2, 3, 4, 5, 6, 89])}
          size={512}
          scale={2}
        />
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
