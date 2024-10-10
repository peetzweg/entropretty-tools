import { themes } from "prism-react-renderer"
import { CodeBlock } from "react-code-block"
import DotPattern from "../components/magicui/dot-pattern"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import Example from "./Example.svg"

const DemoCode = `
import { bit, fillEach } from "entropretty-utils"

const draw = (ctx, seed) => {
  const bits = Array.from({ length: seed.length * 8 }, (_, i) => bit(seed, i))

  const gridSize = Math.ceil(Math.sqrt(bits.length))
  const cellSize = 100 / gridSize // 100x100 canvas
  const rectSize = cellSize

  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, rectSize, rectSize)

  ctx.translate(cellSize, cellSize)
  fillEach(
    bits,
    (b, i) => {
      if (b === 1) {
        const x = (i % gridSize) * cellSize + cellSize / 2
        const y = Math.floor(i / gridSize) * cellSize + cellSize / 2
        ctx.beginPath()
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    ctx,
  )
}

export const schema = {
  draw,
  artist: "LLM",
  name: "Circles of Truthiness",
  seed: "Entropy",
}
`

export const ProceduralTattoos: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full max-w-[960px] flex-col gap-10 self-center md:flex-row">
        <h2>{"× Procedural Tattoos?"}</h2>
        <div className="flex flex-col gap-3">
          <p>
            Tattoos for Proof of Ink can be generated using code. The code
            should function in procedural deterministic way, mapping a trustless
            generated on-chain entropy to a unique tattoo design.
          </p>
          <p>
            This way, the tattoo can be generated on demand, and the same
            citizen will always get the same tattoo. This is important for
            on-chain verification.
          </p>
          <p>Currently known requirements:</p>
          <p className="ml-10">
            × Schemas should be written as{" "}
            <span className="keyword-code">Javascript</span>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
              target="_blank"
            >
              <Button className="p-0 pl-2 text-base underline" variant={"link"}>
                modules
              </Button>
            </a>
            ,
          </p>
          <p className="ml-10">
            × implement this function interface,{" "}
            <span className="keyword-code">{`function draw(context, seed) { ... }`}</span>
          </p>
          <p className="ml-10">
            × export a named <span className="keyword-code">schema</span> object
            with the following properties{" "}
            <span className="keyword-code">{`export const schema = { draw, name, artist, seed  }`}</span>
          </p>
          <p className="ml-10">
            × There are 3 different kinds of{" "}
            <span className="keyword-code">seeds</span>:
          </p>
          <p className="ml-14">
            <span className="w-fit rounded-sm bg-yellow-400 p-1">Entropy</span>:
            4 bytes of <span className="keyword-code">entropy</span>,
          </p>
          <p className="ml-14">
            <span className="rounded-sm bg-red-400 p-1">Personal</span>: 8 bytes
            representing a <span className="keyword-code">u64</span> personal
            id, basically a unique integer number for each citizen,
          </p>

          <p className="ml-14">
            <span className="rounded-sm bg-blue-400 p-1">Account</span>: 32
            bytes representing a{" "}
            <span className="keyword-code">public key</span>.
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
            <CodeBlock.Code className="bg-foreground/90 overflow-scroll rounded-md p-4 text-sm">
              <CodeBlock.LineContent>
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </CodeBlock.Code>
          </CodeBlock>
        </div>

        <div className="relative flex aspect-square w-full items-center justify-center sm:max-w-[640px] md:w-1/2">
          <img src={Example} className="p-4" />
          <DotPattern
            className={cn(
              "-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
      </div>
    </div>
  )
}
