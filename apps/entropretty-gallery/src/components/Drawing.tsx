import { EntroprettyEditorWorker, SchemaMetadata } from "entropretty-editor"
import { Remote } from "comlink"
import { useEffect, useRef } from "react"

interface Props {
  seed: Uint8Array
  schema: SchemaMetadata
  size: number
  worker: Remote<EntroprettyEditorWorker>
}

export const Drawing: React.FC<Props> = ({ seed, schema, size, worker }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current === null) return

    worker.drawTransfer(schema.name, seed, size).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, size, size)
      context.drawImage(bitmap, 0, 0, size, size)
    })
  }, [seed, schema, size, worker])

  return (
    <canvas
      title={schema.artist}
      ref={canvasRef}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  )
}
