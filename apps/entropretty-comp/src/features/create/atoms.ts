import { atom } from "jotai"
import { AlgorithmView } from "@/lib/helper.types"

export const editorCodeAtom = atom<string>("")
export const scriptErrorAtom = atom<string | null>(null)
export const remixAtom = atom<AlgorithmView | null>(null)
