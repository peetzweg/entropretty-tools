import { Button } from "./ui/button"

function Content() {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-lg uppercase text-white">
          ONGOING: Global Competition
        </div>
        <div className="text-3xl font-bold uppercase text-white">
          1000 EUR Prize Money
        </div>

        <div className="text-2xl font-bold text-white">
          Entropretty x Revision
        </div>
      </div>
      <div className="flex flex-col gap-2 text-gray-300">
        <p className="leading-6">
          In collaboration with REVISION 2025, we are hosting a global
          competition to find the best Entropretty algorithms.
        </p>
        <p className="leading-6">
          Create and submit your algorithm to the competition by April 23rd.
          Your algorithm will be demoed on at the REVISION 2025 party.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-gray-300">
        <Button asChild variant={"link"} className="text-base">
          <a className="text-white" href="https://entropretty.com/rules">
            {`> Read the competition rules`}
          </a>
        </Button>
      </div>
    </div>
  )
}

export function RevisionPromotionCard() {
  return (
    <div className="mx-auto flex w-screen flex-col overflow-hidden border bg-black text-white sm:flex-col md:w-[682px]">
      <div className="relative aspect-video h-48 w-full sm:aspect-video sm:h-60">
        <img
          src="/assets/revision-2025-bg.jpg"
          alt="Revision Promo Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assets/revision-2025-logo.png"
            alt="Revision 2025 Logo"
            className="max-h-32 w-auto max-w-[70%] sm:max-w-[50%]"
          />
        </div>
        <div className="absolute bottom-0 left-0 bg-black px-4 py-2 text-sm uppercase">
          Submit by APRIL 23RD 2025
        </div>
      </div>

      <div className="space-y-4 p-4 px-4 pb-4 pt-2">
        <div className="relative space-y-4">
          <Content />
        </div>
      </div>
    </div>
  )
}
