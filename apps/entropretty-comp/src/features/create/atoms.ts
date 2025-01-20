import { atom } from "jotai"

export const editorCodeAtom = atom<string>("")
export const scriptErrorAtom = atom<string | null>(null)
