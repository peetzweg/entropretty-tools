import { AlgorithmView } from "@/lib/helper.types"
import { FamilyKind, getSeed } from "entropretty-utils"
import { atom } from "jotai"

export type SeedType = FamilyKind

export const editorCodeAtom = atom<string>("")

export const editorSeedTypeAtom = atom<SeedType>("Procedural")

export const editorSeedAtom = atom<number[]>([...getSeed("Procedural")])

export const scriptErrorAtom = atom<string | null>(null)

export const remixAtom = atom<AlgorithmView | null>(null)

export const generateNewSeedAtom = atom(null, (get, set) => {
  set(editorSeedAtom, [...getSeed(get(editorSeedTypeAtom))])
})
