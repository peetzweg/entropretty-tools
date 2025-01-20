import { atom } from "jotai"

export const editorCodeAtom = atom<string>("")
export const scriptErrorAtom = atom<Error | null>(null)
