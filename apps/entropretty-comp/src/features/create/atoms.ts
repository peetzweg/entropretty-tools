import { AlgorithmView } from "@/lib/helper.types"
import { FamilyKind, getSeed } from "entropretty-utils"
import { atom } from "jotai"

export type SeedType = FamilyKind

export const editorCodeAtom = atom<string>("")
export const editorCodeVersionAtom = atom<number>(0)
export const editorSeedTypeAtom = atom<SeedType>("Procedural")
export const remixAtom = atom<AlgorithmView | null>(null)
export const scriptErrorAtom = atom<string | null>(null)

export const editorSeedAtom = atom<number[]>([...getSeed("Procedural")])
export const generateNewSeedAtom = atom(null, (get, set) => {
  set(editorSeedAtom, [...getSeed(get(editorSeedTypeAtom))])
})

// Rework with families in mind
// Initialize with 9 seeds for 3x3 grid
const initialSeeds = Array.from({ length: 9 }, () => [...getSeed("Procedural")])
export const seedFamilyAtom = atom<number[][]>(initialSeeds)

// Generate a new seed family
export const generateNewSeedFamilyAtom = atom(null, (get, set) => {
  const seeds = Array.from({ length: 9 }, () => [
    ...getSeed(get(editorSeedTypeAtom)),
  ])
  set(seedFamilyAtom, seeds)
})
