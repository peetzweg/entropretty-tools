import pc from "picocolors"

type ColorFunc = (str: string | number) => string

export type Template = {
  name: string
  display: string
  color: ColorFunc
}

export const templates: readonly Template[] = [
  {
    name: "vanilla",
    display: "Vanilla",
    color: pc.yellow,
  },
  {
    name: "typescript",
    display: "TypeScript",
    color: pc.cyan,
  },
]
