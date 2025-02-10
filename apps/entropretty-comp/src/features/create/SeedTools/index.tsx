import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useAtom, useSetAtom } from "jotai"
import { useCallback } from "react"
import {
  editorSeedFamilyAtom,
  editorSeedTypeAtom,
  generateNewSeedAtom,
  SeedType,
} from "../atoms"
import { SeedManipulator } from "./SeedManipulator"
import { SeedRepresentation } from "./SeedRepresentation"

export const SeedTools = () => {
  const generateNewSeed = useSetAtom(generateNewSeedAtom)

  const [seedType, setSeedType] = useAtom(editorSeedTypeAtom)
  const [seedFamily] = useAtom(editorSeedFamilyAtom)

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
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-muted-foreground text-sm">
          Configure your seed type and modify your current rolled seed.
          Remember, your algorithm should cover the whole seed spectrum.
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

      <div className="flex w-full flex-col gap-4">
        <div>
          <h4 className="font-medium">Current Seed</h4>
          <p className="text-muted-foreground text-sm">
            Fine-tune and adjust your current seed values manually.
          </p>
        </div>

        <SeedRepresentation seed={seedFamily[0]} />
      </div>

      <SeedManipulator />
    </div>
  )
}
