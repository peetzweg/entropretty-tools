import { Drawing } from "@/components/Drawing"
import BlurFade from "@/components/magicui/blur-fade"
import GridPattern from "@/components/magicui/grid-pattern"
import Worker from "@/lib/worker?worker"
import { Remote, wrap } from "comlink"
import { EntroprettyEditorWorker, SchemaMetadata } from "entropretty-editor"
import { useEffect, useMemo, useState } from "react"
import NumberTicker from "../components/magicui/number-ticker"
import { Button } from "../components/ui/button"
import { ArrowUpRight } from "lucide-react"

const worker = new Worker()
const wrappedWorker: Remote<EntroprettyEditorWorker> = wrap(worker)

const SHOWCASE_SEEDS = [
  new Uint8Array([42, 32, 128, 3]),
  new Uint8Array([200, 243, 80, 199]),
  // new Uint8Array([254, 64, 1, 14]),
  new Uint8Array([23, 65, 82, 4]),
  // new Uint8Array([25, 34, 76, 14]),
]

export const Gallery: React.FC = () => {
  const [schemas, setSchemas] = useState<SchemaMetadata[]>([])
  useEffect(() => {
    wrappedWorker.init().then((schemas: SchemaMetadata[]) => {
      setSchemas(schemas.sort(() => 0.5 - Math.random()))
    })
  }, [])

  const artists = useMemo(() => {
    const uniqueArtists = new Set(schemas.map((schema) => schema.artist))
    return uniqueArtists.size
  }, [schemas])

  return (
    <div
      id="gallery"
      className="flex w-full max-w-[960px] flex-col gap-10 self-center md:flex-row"
    >
      <h2 className="keyword-serif whitespace-normal">
        {"× "}
        {schemas.length ? <NumberTicker value={schemas.length} /> : ""}
        {` Schemas`}
      </h2>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <p>
            Following are submitted schemas. These schemas are viable to be
            included to be used in the Proof of Ink process.
          </p>
          <p>
            A total of <NumberTicker value={artists} /> individual artists
            submitted <NumberTicker value={schemas.length} /> designs.
          </p>
          <a
            href="https://github.com/peetzweg/entropretty-tools/issues/new"
            target="_blank"
          >
            <Button
              className="self-start p-0 text-base font-semibold"
              variant="link"
            >
              Submit schema <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="relative flex flex-row flex-wrap items-center justify-center gap-4">
          {schemas.map((schema, idx) =>
            SHOWCASE_SEEDS.map((seed, seedIdx) => (
              <BlurFade
                className="group relative flex aspect-square items-center justify-center"
                key={schema.name + seedIdx}
                delay={0.25 + idx * 0.05}
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
                    size={200}
                    worker={wrappedWorker}
                    seed={seed}
                  />
                </a>
                <p className="text-secondary-foreground fixed bottom-0 left-0 right-0 z-10 rounded-sm bg-slate-200 p-1 text-sm opacity-0 transition-opacity ease-in-out group-hover:opacity-100">{`${schema.name} by ${schema.artist}`}</p>
              </BlurFade>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
