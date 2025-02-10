import { useAtom } from "jotai"
import { editorSeedAtom } from "@/features/create/atoms"
import { seedToKey } from "entropretty-utils"
import { Input } from "@/components/ui/input"
import { ByteManipulator } from "@/components/ByteManipulator"

export const SeedManipulator = () => {
  const [seed, setSeed] = useAtom(editorSeedAtom)

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h3>Representation</h3>
        <div className="flex flex-row items-center justify-center gap-2">
          <Input disabled type="text" value={seedToKey(seed)} />
        </div>
      </div>

      <div>
        <h3>Bytes:</h3>
        <ByteManipulator value={seed} onChange={setSeed} />
      </div>
    </div>
  )
}
