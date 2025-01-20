import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { useWorker } from "@/contexts/worker-context"
import { AlgorithmId } from "@/workers/artist"

interface Props {
  algorithmId: AlgorithmId
  seed: Uint8Array
  size: number
  scale?: number
}

export const AlgorithmBitmap: React.FC<Props> = ({
  algorithmId,
  seed,
  size,
  scale = 2,
}) => {
  const [ready, setIsReady] = useState(false)
  const { artist } = useWorker()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawingSize = useMemo(() => size * scale, [size, scale])

  useEffect(() => {
    console.log("Effect called")
    if (canvasRef.current === null) return

    artist.render(algorithmId, drawingSize, [...seed]).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, drawingSize, drawingSize)
      context.drawImage(bitmap, 0, 0, drawingSize, drawingSize)
      setIsReady(true)
    })
  }, [seed, algorithmId, size, drawingSize, artist])

  return (
    <canvas
      className={cn("cursor-pointer", { hidden: !ready })}
      ref={canvasRef}
      width={drawingSize}
      height={drawingSize}
      style={{ width: size, height: size }}
    />
  )
}
