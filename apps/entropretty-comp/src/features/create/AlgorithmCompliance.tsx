import { useEffect, useState, useRef, useMemo } from "react"
import { AlgorithmId } from "@/workers/artist"
import { useAlgorithmService } from "@/contexts/service-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { Badge } from "@/components/ui/badge"

interface Props {
  algorithmId: AlgorithmId
  seed: number[]
  size: number
  scale?: number
  version?: number
  onClick?: () => void
  className?: string
}

export const AlgorithmCompliance: React.FC<Props> = ({
  algorithmId,
  seed,
  size,
  scale = 1,
  version = 0,
  onClick,
  className,
}) => {
  const service = useAlgorithmService()
  const [overlayImageData, setOverlayImageData] = useState<ImageData | null>(
    null,
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingSize = useMemo(() => size * scale, [size, scale])
  useEffect(() => {
    console.log("checkCompliance", version, algorithmId, seed)
    service
      .checkCompliance(algorithmId, drawingSize, [...seed])
      .then((result) => {
        console.log(result)
        if (result.issueOverlayImageData) {
          setOverlayImageData(result.issueOverlayImageData)
        } else {
          setOverlayImageData(null)
        }
      })
      .catch((error) => {
        console.error(error)
        setOverlayImageData(null)
      })
  }, [seed, algorithmId, size, service, version, scale, drawingSize])

  // Draw overlay on canvas when overlayImageData changes
  useEffect(() => {
    if (canvasRef.current && overlayImageData) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        canvasRef.current.width = overlayImageData.width
        canvasRef.current.height = overlayImageData.height
        ctx.putImageData(overlayImageData, 0, 0)
      }
    }
  }, [overlayImageData])

  return (
    <div className="relative">
      <AlgorithmBitmap
        algorithmId={algorithmId}
        seed={seed}
        size={size}
        scale={scale}
        version={version}
        onClick={onClick}
        className={className}
      />
      {overlayImageData && (
        <>
          <div className="absolute -top-6 left-0">
            <Badge variant="destructive">Warning</Badge>
          </div>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 opacity-100 transition-opacity duration-200 hover:opacity-0"
            width={drawingSize}
            height={drawingSize}
            style={{ width: size, height: size }}
          />
        </>
      )}
    </div>
  )
}
