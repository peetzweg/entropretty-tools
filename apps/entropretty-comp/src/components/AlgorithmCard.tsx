import { Link } from "react-router"
import { Database } from "@/lib/database.types"
import { Button } from "@/components/ui/button"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]
interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
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
      <div className="flex items-center justify-between border-t border-gray-200 p-4 text-sm">
        <div className="text-gray-600">{`${algorithm.name || "Untitled"} by ${algorithm.email || "Anonymous"}`}</div>
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
  )
}
