import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom, useSetAtom } from "jotai"
import { useCallback } from "react"
import { generateNewSeedAtom, SeedType, editorSeedTypeAtom } from "./atoms"

export const SeedTool = () => {
  const generateNewSeed = useSetAtom(generateNewSeedAtom)

  const [seedType, setSeedType] = useAtom(editorSeedTypeAtom)

  const handleSeedTypeChange = useCallback(
    (value: SeedType) => {
      setSeedType(value)
      generateNewSeed()
    },
    [generateNewSeed, setSeedType],
  )

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center gap-2">
        <Select
          defaultValue="Procedural"
          onValueChange={handleSeedTypeChange}
          value={seedType}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Procedural">Procedural</SelectItem>
            <SelectItem value="ProceduralAccount">ProceduralAccount</SelectItem>
            <SelectItem value="ProceduralPersonal">
              ProceduralPersonal
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" onClick={generateNewSeed}>
          REROLL
        </Button>
      </div>
      {/* <div className="text-xs">{seedToKey(new Uint8Array(seed))}</div> */}
    </div>
  )
}
