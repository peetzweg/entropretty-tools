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
import { Separator } from "@/components/ui/separator"
import { editorSeedTypeAtom, generateNewSeedAtom, SeedType } from "../atoms"
import { SeedManipulator } from "./SeedManipulator"

export const SeedTools = () => {
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
    <div className="flex h-full w-full flex-col items-start gap-4 overflow-y-scroll p-4">
      <div>
        <h3 className="text-lg font-medium">Seed Settings</h3>
        <p className="text-muted-foreground text-sm">
          Configure how your current seed and seed type.
        </p>
      </div>

      <div className="flex flex-row items-center gap-2">
        <Select
          defaultValue="Procedural"
          onValueChange={handleSeedTypeChange}
          value={seedType}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Procedural">Entropy</SelectItem>
            <SelectItem value="ProceduralPersonal">Personal Id</SelectItem>
            <SelectItem value="ProceduralAccount">Account Id</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" onClick={generateNewSeed}>
          REROLL
        </Button>
      </div>
      <Separator />

      <SeedManipulator />
    </div>
  )
}
