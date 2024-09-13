import { Gallery } from "@/elements/Gallery"
import { Hero } from "@/elements/Hero"

function App() {
  return (
    <main className="m-4 flex flex-col items-center">
      <div className="flex w-full flex-col gap-24 md:max-w-[720px]">
        <Hero />
        <Gallery />
      </div>
    </main>
  )
}

export default App
