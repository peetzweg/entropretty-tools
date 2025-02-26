import { useEffect, useState, useRef, useMemo } from "react"
import { AlgorithmId } from "@/workers/artist"
import { useAlgorithmService } from "@/contexts/service-context"
import { AlgorithmBitmap } from "@/features/create/AlgorithmBitmap"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CheckMetadata } from "entropretty-compliance/browser"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

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
  const [issues, setIssues] = useState<CheckMetadata[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingSize = useMemo(() => size * scale, [size, scale])

  // Get the colorCount issue if it exists
  const colorCountIssue = useMemo(
    () =>
      issues.find((issue) =>
        // Look for messages about "distinct colors" which is specific to colorCount
        issue.message?.includes("distinct colors"),
      ),
    [issues],
  )

  // Count colorIsland issues
  const colorIslandIssues = useMemo(() => {
    return issues.filter((issue) =>
      // Look for "color island" in the message which is specific to colorIsland issues
      issue.message?.includes("color island"),
    )
  }, [issues])

  // Check if we have any issues that should trigger the popover
  const hasPopoverIssues = useMemo(
    () => colorCountIssue || colorIslandIssues.length > 0,
    [colorCountIssue, colorIslandIssues],
  )

  useEffect(() => {
    service
      .checkCompliance(algorithmId, drawingSize, [...seed])
      .then((result) => {
        if (result.issueOverlayImageData) {
          setOverlayImageData(result.issueOverlayImageData)
          setIssues(result.issues)
        } else {
          setOverlayImageData(null)
          setIssues([])
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error("Error checking compliance", {
          description: error.message,
        })
        setOverlayImageData(null)
        setIssues([])
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
      {issues.length > 0 && (
        <div className="absolute -top-6 left-0">
          <Popover>
            <PopoverTrigger asChild>
              <Badge variant="destructive" className="cursor-pointer">
                Warning
              </Badge>
            </PopoverTrigger>
            <PopoverContent variant={"destructive"} className="w-auto p-2">
              <ul className="list-disc space-y-1 pl-4 text-sm">
                {colorCountIssue && <li>{colorCountIssue.message}</li>}
                {colorIslandIssues.length > 0 && (
                  <li>
                    {`There ${colorIslandIssues.length === 1 ? "is" : "are"} ${colorIslandIssues.length} detailed ${colorIslandIssues.length === 1 ? "area" : "areas"} which might not be tattooable.`}
                  </li>
                )}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      )}
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
