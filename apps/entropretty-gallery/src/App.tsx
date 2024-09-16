import { Gallery } from "@/elements/Gallery"
import { Hero } from "@/elements/Hero"
import { Tools } from "@/elements/Tools"
import { ProceduralTattoos } from "@/elements/ProceduralTattoos"
import { Web3Citizenship } from "./elements/Web3Citizenship"

function App() {
  return (
    <main className="m-4 flex flex-col gap-24">
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center">
        <div className="relative flex w-full flex-col gap-24 md:max-w-[720px]">
          <Hero />
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center">
        <div className="relative flex w-full flex-col gap-24 md:max-w-[720px]">
          <Web3Citizenship />
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center">
        <ProceduralTattoos />
      </div>

      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center">
        <div className="relative flex w-full flex-col gap-24 md:max-w-[720px]">
          <Tools />
        </div>
      </div>

      <Gallery />
    </main>
  )
}

export default App
