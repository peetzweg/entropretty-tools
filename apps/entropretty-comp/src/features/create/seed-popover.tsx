import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BitInspector } from "./BitInspector"
import { useAtom } from "jotai"
import { editorSeedAtom } from "./atoms"
import { seedToKey } from "entropretty-utils"
import { Input } from "../../components/ui/input"

export default function SeedPopover() {
  const [seed] = useAtom(editorSeedAtom)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          SEED
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-h-[500px] w-auto flex-col gap-4 overflow-y-auto p-2">
        <div>
          <h3>Representation</h3>
          <div className="flex flex-row items-center justify-center gap-2">
            <Input
              disabled
              type="text"
              value={seedToKey(new Uint8Array(seed))}
            />
          </div>
        </div>

        <div>
          <h3>bytes:</h3>
          <BitInspector bytes={seed} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
