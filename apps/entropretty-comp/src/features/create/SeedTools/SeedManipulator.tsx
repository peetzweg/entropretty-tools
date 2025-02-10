import { ByteManipulator } from "@/components/ByteManipulator"
import { editorSeedFamilyAtom } from "@/features/create/atoms"
import { useAtom } from "jotai"

export const SeedManipulator = () => {
  const [seedFamily, setSeedFamily] = useAtom(editorSeedFamilyAtom)

  const handleSeedChange = (newSeed: number[]) => {
    setSeedFamily((prev) => {
      const newFamily = [...prev]
      newFamily[0] = newSeed
      return newFamily
    })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h4 className="font-medium">Manipulation</h4>
        <p className="text-muted-foreground text-sm">
          Fine-tune and adjust your current seed values manually.
        </p>
      </div>

      <div className="flex w-full flex-row items-center justify-center">
        <ByteManipulator value={seedFamily[0]} onChange={handleSeedChange} />
      </div>
    </div>
  )
}
