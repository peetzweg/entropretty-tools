import { CodeBlock } from "react-code-block"
import { themes } from "prism-react-renderer"
import DotPattern from "../components/magicui/dot-pattern"
import { cn } from "../lib/utils"

const DemoCode = `
const draw = (ctx, seed) => {
  // Draw grid and numbers
  seed.forEach((n, i) => {
    const row = Math.floor(i / grid)
    const col = i % grid
    const x = col * cellSize
    const y = row * cellSize

    // Draw cell border
    ctx.strokeStyle = "#ccc"
    ctx.strokeRect(x, y, cellSize, cellSize)

    // Draw number
    ctx.fillStyle = "#000"
    ctx.fillText(n.toString(), x + cellSize / 2, y + cellSize / 2)
  })
}

export const schema = {
  artist: "peet.sh",
  name: "The Ring",
  draw,
  kind: "Procedural",
}

`

export const ProceduralTattoos: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full max-w-[960px] flex-col gap-10 self-center md:flex-row">
        <h2>{"× Procedural Tattoos?"}</h2>
        <div className="flex flex-col gap-3">
          <p>
            Procedural tattoo schema for Proof of Ink are written in Javascript.
          </p>
          <p className="">
            Every design schema needs to implement the following common
            interface,{" "}
            <span className="rounded-sm bg-slate-200 p-1">{`const draw(context, seed) => {}`}</span>
            . And export a named schema object with the following properties,{" "}
            <span className="rounded-sm bg-slate-200 p-1">{`export schema = {artist, kind, draw, name}`}</span>
            .
          </p>
          <p>
            There are 3 different kinds of Procedural tattoos,{" "}
            <span className="rounded-sm bg-yellow-400 p-1">Procedural</span>,{" "}
            <span className="rounded-sm bg-red-400 p-1">
              ProceduralPersonal
            </span>{" "}
            and{" "}
            <span className="rounded-sm bg-blue-400 p-1">
              ProceduralAccount
            </span>
            .
          </p>
          <p>
            Depending on the kind, the given seed bytes will be different. It
            will be{" "}
            <span className="whitespace-nowrap rounded-sm bg-yellow-400 p-1">
              4 bytes
            </span>{" "}
            of Entropy,{" "}
            <span className="whitespace-nowrap rounded-sm bg-red-400 p-1">
              8 bytes
            </span>{" "}
            representing a u32 citizen id or{" "}
            <span className="whitespace-nowrap rounded-sm bg-blue-400 p-1">
              32 bytes
            </span>{" "}
            representing a public key
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap-reverse justify-center">
        <div className="w-full sm:max-w-[640px] md:w-1/2">
          <CodeBlock
            code={DemoCode}
            language="js"
            theme={themes.vsDark}
            lines={[2, 3]}
          >
            <CodeBlock.Code className="bg-foreground/90 overflow-scroll rounded-md p-4">
              <CodeBlock.LineContent>
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </CodeBlock.Code>
          </CodeBlock>
        </div>

        <div className="relative flex aspect-square w-full items-center justify-center sm:max-w-[640px] md:w-1/2">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            )}
          />
          <svg width="200" height="200" className="z-50">
            <circle cx="100" cy="100" r="50" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  )
}
