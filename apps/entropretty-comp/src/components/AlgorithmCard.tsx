import { Link } from "react-router"
import { Database } from "../lib/database.types"

type AlgorithmView =
  Database["public"]["Views"]["algorithms_with_user_info"]["Row"]

interface AlgorithmCardProps {
  algorithm: AlgorithmView
  preview?: boolean
}

export function AlgorithmCard({ algorithm, preview }: AlgorithmCardProps) {
  const content = (
    <div className="rounded-lg bg-white p-6 shadow transition hover:shadow-md">
      <div className={`whitespace-pre-wrap ${preview ? "line-clamp-3" : ""}`}>
        {algorithm.content}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Created by: {algorithm.email || "Anonymous"}
      </div>
    </div>
  )

  if (preview) {
    return (
      <Link to={`/algo/${algorithm.id}`} className="block">
        {content}
      </Link>
    )
  }

  return content
}
