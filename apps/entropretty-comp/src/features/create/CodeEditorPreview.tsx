import { useAtom } from "jotai"
import { useEffect, useRef, useState } from "react"
import { useWorker } from "@/contexts/worker-context"
import { cn } from "@/lib/utils"
import { algorithmVersionAtom, scriptErrorAtom } from "./atoms"

interface CodeEditorPreviewProps {
  seed: number[]
  size?: number
  scale?: number
}

const CodeEditorPreview = ({
  seed,
  size = 512,
  scale = 2,
}: CodeEditorPreviewProps) => {
  const [algorithmVersion] = useAtom(algorithmVersionAtom)
  const [, setScriptError] = useAtom(scriptErrorAtom)
  const [ready, setIsReady] = useState(false)
  const { artist } = useWorker()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingSize = size * scale

  useEffect(() => {
    if (canvasRef.current === null) return

    artist
      .render(0, drawingSize, seed)
      .then((bitmap) => {
        const context = canvasRef.current!.getContext("2d")!
        context.clearRect(0, 0, drawingSize, drawingSize)
        context.drawImage(bitmap, 0, 0, drawingSize, drawingSize)
        setScriptError(null)
        setIsReady(true)
      })
      .catch((e) => {
        setScriptError(e.message)
        console.error(e)
      })
  }, [artist, drawingSize, seed, algorithmVersion, setScriptError])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border border-dashed">
        <canvas
          className={cn("cursor-pointer", { hidden: !ready })}
          ref={canvasRef}
          width={drawingSize}
          height={drawingSize}
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  )
}

export default CodeEditorPreview
