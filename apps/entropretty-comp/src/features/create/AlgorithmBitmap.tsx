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
  className?: string
}

export const AlgorithmBitmap: React.FC<Props> = ({
  algorithmId,
  seed,
  size,
  scale = 2,
  onClick,
  version = 0,
  className,
}) => {
  const [ready, setIsReady] = useState(false)
  const { artist } = useWorker()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawingSize = useMemo(() => size * scale, [size, scale])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.altKey && canvasRef.current) {
      const link = document.createElement("a")
      link.download = `${algorithmId}_${seed.join("-")}.png`
      link.href = canvasRef.current.toDataURL("image/png")
      link.click()
    } else if (onClick) {
      onClick()
    }
  }

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
      className={cn(
        "transition-opacity",
        {
          "opacity-0": !ready,
          "cursor-pointer": !!onClick,
        },
        className,
      )}
      onClick={handleCanvasClick}
      ref={canvasRef}
      width={drawingSize}
      height={drawingSize}
      title={`${seedToKey(seed)} (Alt+Click to download)`}
      style={{ width: size, height: size }}
    />
  )
}
