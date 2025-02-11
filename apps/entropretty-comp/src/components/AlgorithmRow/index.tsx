import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { AlgorithmView } from "@/lib/helper.types"
import { getSeed, seedToKey } from "entropretty-utils"
import { Link } from "react-router"
import { LikeButton } from "../AlgorithmCard/LikeButton"
import { DeleteButton } from "./DeleteButton"
import { useMemo } from "react"

interface AlgorithmRowProps {
  algorithm: AlgorithmView
}

export function AlgorithmRow({ algorithm }: AlgorithmRowProps) {
  const { user } = useAuth()
  const seed = useMemo(() => {
    return [...getSeed(algorithm.family_kind!)]
  }, [algorithm.family_kind])

  if (!algorithm.id) return null

  return (
    <div className="flex w-full items-center justify-between gap-4 border border-gray-200 bg-white p-2">
      <div className="flex items-center gap-4">
        <div className="">
          <AlgorithmBitmap
            key={seedToKey(seed)}
            algorithmId={algorithm.id}
            seed={seed}
            size={68}
            scale={1.5}
          />
        </div>

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
          <div className="text-sm text-gray-600">{`by ${algorithm.email || "Anonymous"}`}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
        <DeleteButton algorithm={algorithm} />
        {/* <LikeButton algorithm={algorithm} /> */}
      </div>
    </div>
  )
}
