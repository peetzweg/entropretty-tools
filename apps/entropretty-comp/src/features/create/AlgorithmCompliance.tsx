import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAlgorithmService } from "@/contexts/service-context"
import { cn } from "@/lib/utils"
import { AlgorithmId } from "@/workers/artist"
import { CheckMetadata } from "entropretty-compliance/browser"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { AlgorithmBitmap } from "./AlgorithmBitmap"

// Extend the CheckMetadata type to include the details property with colors
interface ExtendedCheckMetadata extends CheckMetadata {
  details?: {
    totalColors?: number
    uniqueColors?: Array<{
      r: number
      g: number
      b: number
      hex: string
    }>
    tolerance?: number
    whiteTolerance?: number
    maxColors?: number
    note?: string
  }
}

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
  const [issues, setIssues] = useState<ExtendedCheckMetadata[]>([])
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

  // Extract colors from colorCountIssue if they exist
  const issueColors = useMemo(() => {
    if (colorCountIssue?.details?.uniqueColors) {
      return colorCountIssue.details.uniqueColors.map((color) => color.hex)
    }
    return []
  }, [colorCountIssue])

  const anyIssues = useMemo(() => {
    if (colorCountIssue || colorIslandIssues.length > 0) {
      return true
    }
    return false
  }, [colorCountIssue, colorIslandIssues])

  useEffect(() => {
    if (anyIssues) {
      toast.custom(
        (id) => {
          return (
            <div className="bg-destructive flex flex-col gap-2 p-4 text-white [box-shadow:4px_4px_0_0_rgba(0,0,0,0.5)]">
              <h3 className="font-mono text-xs">⚠️ Warning:</h3>
              <p className="font-mono text-xs leading-5">
                The output images generated by your algorithm may not always
                meet the criteria for tattooability. Submissions deemed
                unsuitable could lead to disqualification. While we run
                automated checks, they are not foolproof. Please proceed at your
                own risk.
              </p>

              <Button
                variant="outline"
                className="w-1/2 self-end bg-transparent font-mono"
                size="sm"
                onClick={() => toast.dismiss(id)}
              >
                Okay
              </Button>
            </div>
          )
        },
        {
          id: "algorithm-compliance-warning",
          duration: Infinity,
          position: "top-right",
        },
      )
    }
  }, [anyIssues])

  useEffect(() => {
    service.cancelComplianceCheck(algorithmId, drawingSize, [...seed])
    service
      .checkCompliance(algorithmId, drawingSize, [...seed])
      .then((result) => {
        // Always set issues, even if there's no overlay image data
        setIssues(result.issues as ExtendedCheckMetadata[])

        if (result.issueOverlayImageData) {
          setOverlayImageData(result.issueOverlayImageData)
        } else {
          setOverlayImageData(null)
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
        <div className="absolute -top-[25px] left-[-1px]">
          <Popover>
            <PopoverTrigger asChild>
              <Badge variant="destructive" className="cursor-pointer">
                Warning
              </Badge>
            </PopoverTrigger>
            <PopoverContent variant={"destructive"} className="w-auto p-2">
              <ul className="list-disc space-y-1 pl-4 text-sm">
                {colorIslandIssues.length > 0 && (
                  <li>
                    {`There ${colorIslandIssues.length === 1 ? "is" : "are"} ${colorIslandIssues.length} detailed ${colorIslandIssues.length === 1 ? "area" : "areas"} which might not be tattooable.`}
                  </li>
                )}
                {colorCountIssue && (
                  <>
                    <li>{colorCountIssue.message}</li>
                    {issueColors.length > 0 && (
                      <div className="ml-2 mt-2 flex flex-wrap gap-2">
                        {issueColors.map((color: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-center bg-white p-0.5"
                          >
                            <div
                              className="h-3 w-3"
                              style={{ backgroundColor: color }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
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
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute left-0 top-0 h-full w-full cursor-pointer touch-none transition-opacity hover:opacity-0",
            className,
          )}
          onClick={onClick}
        />
      )}
    </div>
  )
}
