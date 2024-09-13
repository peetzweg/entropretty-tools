import { Drawing } from "@/components/Drawing"
import BlurFade from "@/components/magicui/blur-fade"
import GridPattern from "@/components/magicui/grid-pattern"
import Worker from "@/lib/worker?worker"
import { Remote, wrap } from "comlink"
import { EntroprettyEditorWorker, SchemaMetadata } from "entropretty-editor"
import { useEffect, useState } from "react"

const worker = new Worker()
const wrappedWorker: Remote<EntroprettyEditorWorker> = wrap(worker)

export const Gallery: React.FC = () => {
  const [schemas, setSchemas] = useState<SchemaMetadata[]>([])
  useEffect(() => {
    wrappedWorker.init().then((schemas: SchemaMetadata[]) => {
      setSchemas(schemas.reverse())
    })
  }, [])

  return (
    <div id="gallery">
      <h2>Gallery</h2>

      <div className="relative grid grid-cols-2 gap-0">
        {schemas.map((schema, idx) => (
          <BlurFade
            className="relative flex aspect-square items-center justify-center"
            key={schema.name}
            delay={0.25 + idx * 0.05}
            inView
          >
            <Drawing
              schema={schema}
              size={300}
              worker={wrappedWorker}
              seed={new Uint8Array([42, 32, 128, 3])}
            />
            <GridPattern
              width={60}
              height={60}
              x={-30}
              y={-30}
              strokeDasharray={"4 2"}
              // className={cn(
              //   "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              // )}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}
