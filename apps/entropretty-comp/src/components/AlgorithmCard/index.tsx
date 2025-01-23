import { Button } from "@/components/ui/button"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { Link } from "react-router"
import { AlgorithmView } from "@/lib/helper.types"
import { useAuth } from "@/contexts/auth-context"
import { useCallback, useState } from "react"
import { DicesIcon, ThumbsUp } from "lucide-react"
import { getSeed } from "entropretty-utils"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useUsersLikes } from "@/hooks/useUsersLikes"
import { LikeButton } from "./LikeButton"
interface AlgorithmCardProps {
  algorithm: AlgorithmView
}

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const { user } = useAuth()
  const { data: likesOfUser } = useUsersLikes()
  console.log(likesOfUser)
  const [seed, setSeed] = useState<number[]>([...getSeed("Procedural")])
  const requestNewSeed = useCallback(() => {
    setSeed([...getSeed("Procedural")])
  }, [])

  const like = useCallback(async () => {
    if (!user) return

    const { error } = await supabase
      .from("likes")
      .insert([{ algorithm_id: algorithm.id, user_id: user.id }])

    if (error) {
      console.error("Error inserting like:", error)
      toast.error("Error Liking Algorithm: " + error.message)
    }
  }, [algorithm.id, user])

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
        <div className="absolute bottom-2 right-2 flex flex-row">
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
