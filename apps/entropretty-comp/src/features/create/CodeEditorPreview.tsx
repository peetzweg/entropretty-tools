import { useAtom } from "jotai"
import { useEffect, useMemo, useRef, useState } from "react"
import { useWorker } from "../../contexts/worker-context"
import { cn } from "../../lib/utils"
import { editorCodeAtom, scriptErrorAtom } from "./atoms"

const CodeEditorPreview = ({ size = 512, scale = 2 }) => {
  const [editorCode] = useAtom(editorCodeAtom)
  const [, setScriptError] = useAtom(scriptErrorAtom)

  const [ready, setIsReady] = useState(false)
  const { artist } = useWorker()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawingSize = useMemo(() => size * scale, [size, scale])

  useEffect(() => {
    if (canvasRef.current === null) return

    artist.updateAlgorithm(0, editorCode)
    artist
      .render(0, drawingSize, [1, 2, 3, 4])
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
  }, [artist, drawingSize, editorCode, setScriptError])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <canvas
        className={cn("cursor-pointer", { hidden: !ready })}
        ref={canvasRef}
        width={drawingSize}
        height={drawingSize}
        style={{ width: size, height: size }}
      />
    </div>
  )
}

export default CodeEditorPreview
