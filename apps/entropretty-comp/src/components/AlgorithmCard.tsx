import { Link } from "react-router"
import { Database } from "../lib/database.types"
import { Button } from "./ui/button"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]
interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <div className="flex aspect-square w-full flex-col border border-gray-200 bg-white">
      <div className="flex-1 p-6">
        <div className={`whitespace-pre-wrap`}>{algorithm.content}</div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 p-4 text-sm">
        <div className="text-gray-600">{algorithm.email || "Anonymous"}</div>
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
