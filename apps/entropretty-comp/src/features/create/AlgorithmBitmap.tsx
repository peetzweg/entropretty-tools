import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { useWorker } from "@/contexts/worker-context"
import { AlgorithmId } from "@/workers/artist"
import { seedToKey } from "entropretty-utils"

interface Props {
  algorithmId: AlgorithmId
  seed: number[]
  size: number
  scale?: number
  onClick?: () => void
  version?: number
}

export const AlgorithmBitmap: React.FC<Props> = ({
  algorithmId,
  seed,
  size,
  scale = 2,
  onClick,
  version = 0,
}) => {
  const [ready, setIsReady] = useState(false)
  const { artist } = useWorker()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawingSize = useMemo(() => size * scale, [size, scale])

  useEffect(() => {
    if (canvasRef.current === null) return

    setIsReady(false)
    artist.render(algorithmId, drawingSize, [...seed]).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, drawingSize, drawingSize)
      context.drawImage(bitmap, 0, 0, drawingSize, drawingSize)
      setIsReady(true)
    })
  }, [seed, algorithmId, size, drawingSize, artist, version])

  return (
    <canvas
      className={cn("transition-opacity", {
        "opacity-0": !ready,
        "cursor-pointer": !!onClick,
      })}
      onClick={onClick}
      ref={canvasRef}
      width={drawingSize}
      height={drawingSize}
      title={seedToKey(seed)}
      style={{ width: size, height: size }}
    />
  )
}
