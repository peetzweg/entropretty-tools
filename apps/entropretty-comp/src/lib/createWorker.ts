import * as Comlink from "comlink"

export const createWorker = () => {
  const _algorithms = new Map<string, string>()
  let _isInitialized = false
  let _subscribers = new Map<
    string,
    Map<string, (bitmap: ImageBitmap) => void>
  >()

  return {
    init: async () => {
      _isInitialized = true
    },
    isInitialized: () => {
      return _isInitialized
    },
    hasAlgorithmId: (algorithmId: string) => {
      return _algorithms.has(algorithmId)
    },
    updateAlgorithm: (algorithmId: string, algorithm: string) => {
      _algorithms.set(algorithmId, algorithm)
    },
    subscribe: (
      algorithmId: string,
      seed: Uint8Array,
      size: number,
      callback: (bitmap: ImageBitmap) => void,
    ) => {
      // _algorithms.set(algorithmId, callback)
    },
    drawTransfer: async (
      algorithmId: string,
      seed: Uint8Array,
      size: number,
    ) => {
      const canvas = new OffscreenCanvas(size, size)
      const context = canvas.getContext("2d")
      if (!context) throw "Unable to get Context from OffscreenCanvas in Worker"

      const algorithm = _algorithms.get(algorithmId)
      if (algorithm === undefined)
        throw "algorithm not loaded, try adding it before drawing"

      context.clearRect(0, 0, canvas.width, canvas.height)
      context.scale(canvas.width / 100, canvas.width / 100)

      // Prelude
      context.lineWidth = 1
      context.lineCap = "butt"
      context.lineJoin = "miter"
      context.strokeStyle = "black"
      context.fillStyle = "black"
      context.textAlign = "center"
      context.textBaseline = "bottom"

      try {
        const userFunction = new Function("ctx", "seed", algorithm)
        userFunction(context, seed)
      } catch (e) {
        console.error("Error drawing", algorithmId)
        console.info(e)
      }

      const bitmap = canvas.transferToImageBitmap()
      return Comlink.transfer(bitmap, [bitmap])
    },
  }
}

export type CompWorker = ReturnType<typeof createWorker>
