import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { CompWorker } from "@/lib/createWorker"

interface Props {
  id?: string
  seed: Uint8Array
  algorithmId: string
  size: number
  scale?: number
  worker: CompWorker
}

export const DrawingBitmap: React.FC<Props> = ({
  seed,
  algorithmId,
  size,
  scale = 2,
  id,
  worker,
}) => {
  const [ready, setIsReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawingSize = useMemo(() => size * scale, [size, scale])

  useEffect(() => {
    if (canvasRef.current === null) return

    worker!.drawTransfer(algorithmId, seed, drawingSize).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, drawingSize, drawingSize)
      context.drawImage(bitmap, 0, 0, drawingSize, drawingSize)
      setIsReady(true)
    })
  }, [seed, algorithmId, size, worker, drawingSize])

  return (
    <canvas
      id={id}
      className={cn("cursor-pointer", { hidden: !ready })}
      ref={canvasRef}
      width={drawingSize}
      height={drawingSize}
      style={{ width: size, height: size }}
    />
  )
}
