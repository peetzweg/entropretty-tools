import { AlgorithmView } from "@/lib/helper.types"
import { Link } from '@tanstack/react-router'

export const AlgorithmInfo = ({ algorithm }: { algorithm: AlgorithmView }) => {
  return (
    <div className="flex flex-col text-sm text-gray-600">
      <div>
        <span>
          {`${algorithm.name || "Untitled"} `}
          <Link
            className="text-muted-foreground underline"
            to={`/a/$id`}
            params={{ id: algorithm.id!.toString() }}
          >{`/a/${algorithm.id}`}</Link>
        </span>

        {algorithm.remix_of && (
          <>
            {` remix of `}
            <Link to={`/a/$id`} params={{ id: algorithm.remix_of.toString() }}>
            {`/a/${algorithm.remix_of}`}</Link>
          </>
        )}
      </div>
      <div>
        {`by `}
        <Link
          className="text-muted-foreground underline"
          to={`/u/$id`}
          params={{ id: algorithm.username || "Anonymous" }}
        >
          {algorithm.username || "Anonymous"}
        </Link>
      </div>
    </div>
  )
}
