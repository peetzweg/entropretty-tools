import { atom } from "jotai"
import { AlgorithmView } from "@/lib/helper.types"
import { getSeed } from "entropretty-utils"

export const editorCodeAtom = atom<string>("")
export const editorSeedAtom = atom<number[]>([...getSeed("Procedural")])
export const scriptErrorAtom = atom<string | null>(null)
export const remixAtom = atom<AlgorithmView | null>(null)

export const generateNewSeedAtom = atom(null, (_get, set) => {
  set(editorSeedAtom, [...getSeed("Procedural")])
})
