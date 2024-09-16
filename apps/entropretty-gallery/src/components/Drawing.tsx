import { EntroprettyEditorWorker, SchemaMetadata } from "entropretty-editor"
import { Remote } from "comlink"
import { useEffect, useMemo, useRef } from "react"

interface Props {
  seed: Uint8Array
  schema: SchemaMetadata
  size: number
  worker: Remote<EntroprettyEditorWorker>
}

export const Drawing: React.FC<Props> = ({ seed, schema, size, worker }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasSize = useMemo(() => size * 2, [size])

  useEffect(() => {
    if (canvasRef.current === null) return

    worker.drawTransfer(schema.name, seed, canvasSize).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, canvasSize, canvasSize)
      context.drawImage(bitmap, 0, 0, canvasSize, canvasSize)
    })
  }, [seed, schema, size, worker])

  return (
    <canvas
      title={schema.artist}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{ width: size, height: size }}
    />
  )
}
