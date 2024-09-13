import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { useApp } from "../lib/state"

interface Props {
  seed: Uint8Array
  schema: string
  size: number
}

export const DrawingBitmap: React.FC<Props> = ({ seed, schema, size }) => {
  const [ready, setIsReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worker = useApp((state) => state.worker)

  useEffect(() => {
    if (canvasRef.current === null) return

    worker!.drawTransfer(schema, seed, size).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!
      context.clearRect(0, 0, size, size)
      context.drawImage(bitmap, 0, 0, size, size)
      setIsReady(true)
    })
  }, [seed, schema, size, worker])

  return (
    <>
      <Skeleton
        title={seed.join(",")}
        className={cn({ hidden: ready })}
        style={{ width: size, height: size }}
      />
      <canvas
        title={seed.join(",")}
        className={cn("cursor-pointer", { hidden: !ready })}
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </>
  )
}
