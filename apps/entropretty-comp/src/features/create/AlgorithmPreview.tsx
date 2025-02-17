import { useWorker } from "@/contexts/worker-context"
import { seedToKey } from "entropretty-utils"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { AlgorithmBitmap } from "./AlgorithmBitmap"
import {
  editorCodeAtom,
  editorCodeVersionAtom,
  scriptErrorAtom,
  editorSeedFamilyAtom,
} from "./atoms"

const PREVIEW_SIZE = 224 // Smaller size for the grid previews

export const AlgorithmPreview = () => {
  const [editorCode] = useAtom(editorCodeAtom)
  const [seedFamily] = useAtom(editorSeedFamilyAtom)
  const [, setScriptError] = useAtom(scriptErrorAtom)
  const [codeVersion, setAlgorithmVersion] = useAtom(editorCodeVersionAtom)
  const { artist } = useWorker()

  // Update algorithm in worker when code changes
  useEffect(() => {
    artist
      .updateAlgorithm(0, editorCode)
      .then(() => {
        setScriptError(null)
        // Increment version to trigger redraws
        setAlgorithmVersion((v) => v + 1)
      })
      .catch((e) => {
        setScriptError(e.message)
        console.error(e)
      })
  }, [artist, editorCode, setScriptError, setAlgorithmVersion])

  return (
    <div className="grid h-full w-full grid-cols-3 overflow-scroll">
      {seedFamily.slice(0, 9).map((seed, index) => (
        <div
          key={seedToKey(seed)}
          className="flex items-center justify-center border-[.5px] border-gray-200"
        >
          <AlgorithmBitmap
            key={`canvas-${index}`}
            algorithmId={0}
            seed={seed}
            size={PREVIEW_SIZE}
            scale={2}
            version={codeVersion}
          />
        </div>
      ))}
    </div>
  )
}
