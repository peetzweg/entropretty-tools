import { ByteManipulator } from "@/components/ByteManipulator"
import { Input } from "@/components/ui/input"
import { editorSeedFamilyAtom } from "@/features/create/atoms"
import { seedToKey } from "entropretty-utils"
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
        <h4 className="font-medium">Seed Manipulation</h4>
        <p className="text-muted-foreground text-sm">
          Fine-tune and adjust your seed values manually.
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <Input disabled type="text" value={seedToKey(seedFamily[0])} />
      </div>

      <div className="flex w-full flex-row items-center justify-center">
        <ByteManipulator value={seedFamily[0]} onChange={handleSeedChange} />
      </div>
    </div>
  )
}
