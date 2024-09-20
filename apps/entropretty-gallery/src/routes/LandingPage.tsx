import { Guidelines } from "@/sections/Guidelines"
import { Hero } from "@/sections/Hero"
import { ProceduralTattoos } from "@/sections/ProceduralTattoos"
import { Tools } from "@/sections/Tools"
import { Web3Citizenship } from "@/sections/Web3Citizenship"

function LandingPage() {
  return (
    <main className="m-4 flex flex-col gap-24">
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <div className="relative flex w-full flex-col gap-24 md:max-w-[720px]">
          <Hero />
        </div>
      </div>

      <div className="flex min-h-[80vh] flex-col items-center">
        <div className="relative flex w-full flex-col gap-24 md:max-w-[720px]">
          <Web3Citizenship />
        </div>
      </div>

      <div className="flex min-h-[80vh] flex-col items-center">
        <ProceduralTattoos />
      </div>

      <div className="flex min-h-[80vh] flex-col items-center">
        <Guidelines />
      </div>

      <div className="flex min-h-[80vh] flex-col items-center">
        <Tools />
      </div>
    </main>
  )
}

export default LandingPage
