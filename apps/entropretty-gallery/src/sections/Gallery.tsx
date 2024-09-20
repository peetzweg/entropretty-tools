import { Drawing } from "@/components/Drawing"
import BlurFade from "@/components/magicui/blur-fade"
import GridPattern from "@/components/magicui/grid-pattern"
import NumberTicker from "@/components/magicui/number-ticker"
import { Button } from "@/components/ui/button"
import Worker from "@/lib/worker?worker"
import { Remote, wrap } from "comlink"
import { EntroprettyEditorWorker } from "entropretty-editor"
import type { SchemaMetadata } from "entropretty-utils"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useOnScrollLeft } from "../hooks/useOnScrollLeft"
import { Link } from "react-router-dom"

const worker = new Worker()
const wrappedWorker: Remote<EntroprettyEditorWorker> = wrap(worker)

export const Gallery: React.FC = () => {
  const [schemas, setSchemas] = useState<SchemaMetadata[]>([])
  const [designs, setDesigns] = useState<
    {
      seed: Uint8Array
      schema: SchemaMetadata
    }[]
  >([])
  useEffect(() => {
    wrappedWorker.init().then((schemas: SchemaMetadata[]) => {
      setSchemas(schemas.sort(() => 0.5 - Math.random()))
    })
  }, [])

  useEffect(() => {
    if (schemas.length === 0) return
    const initialSet = Array.from({ length: 75 }).map(() => {
      const randomSchema = schemas[Math.floor(Math.random() * schemas.length)]
      const randomSeed = new Uint8Array(4)
      crypto.getRandomValues(randomSeed)
      return { seed: randomSeed, schema: randomSchema }
    })

    setDesigns(initialSet)
  }, [schemas])

  useOnScrollLeft(
    () => {
      const newSet = Array.from({ length: 25 }).map(() => {
        const randomSchema = schemas[Math.floor(Math.random() * schemas.length)]
        const randomSeed = new Uint8Array(4)
        crypto.getRandomValues(randomSeed)
        return { seed: randomSeed, schema: randomSchema }
      })
      setDesigns((prev) => [...prev, ...newSet])
    },
    { scrollLeft: 125 },
  )

  const artists = useMemo(() => {
    const uniqueArtists = new Set(schemas.map((schema) => schema.artist))
    return uniqueArtists.size
  }, [schemas])

  return (
    <div className="relative">
      <div className="fixed bottom-0 right-0 z-10 m-4 flex w-[calc(100vw-32px)] flex-col rounded-md border bg-white p-4 text-sm md:w-1/2 lg:w-1/3">
        <h2 className="keyword-serif whitespace-normal">
          {"× "}
          {schemas.length ? <NumberTicker value={schemas.length} /> : ""}
          {` Schemas`}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p>
              A total of <NumberTicker value={artists} /> individual artists
              submitted <NumberTicker value={schemas.length} /> designs.
              Contribute your Design to{" "}
              <a
                href="https://www.youtube.com/watch?v=MrWioikibEI"
                target="_blank"
                className="keyword-code underline"
              >
                Proof of Ink
              </a>
              .
            </p>
          </div>
          <Link to="/tools">
            <Button className="text-base font-semibold">
              Learn how <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative flex h-full w-full flex-row flex-wrap items-center justify-center gap-4">
        {designs.map(({ seed, schema }, designIndex) => (
          <BlurFade
            className="group relative flex aspect-square items-center justify-center"
            key={schema.name + designIndex}
            // delay={0.25 + designIndex * 0.05}
            inView
          >
            <GridPattern
              width={40}
              height={40}
              x={-20}
              y={-20}
              strokeDasharray={"4 2"}
            />
            <a
              href="https://github.com/peetzweg/entropretty-tools/tree/main/apps/entropretty-gallery/schemas"
              target="_blank"
              className="z-10"
            >
              <Drawing
                schema={schema}
                size={125}
                worker={wrappedWorker}
                seed={seed}
              />
            </a>
            <p className="text-secondary-foreground fixed bottom-0 left-0 right-0 z-10 rounded-sm bg-slate-200 p-1 text-sm opacity-0 transition-opacity ease-in-out group-hover:opacity-100">{`${schema.name} by ${schema.artist}`}</p>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}
