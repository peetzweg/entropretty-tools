import { Button } from "./ui/button"

export function WinterAssemblyPromotionCard() {
  return (
    <div className="mx-auto flex w-screen flex-col overflow-hidden border bg-black text-white sm:flex-row md:w-[682px]">
      <div className="relative aspect-video h-36 w-full sm:aspect-video sm:h-auto">
        <img
          src="/Assembly-Winter-25-1920x1080-bg.webp"
          alt="Assembly Winter 2025 Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assembly-winter-2025-logo.png"
            alt="Assembly Winter 2025 Logo"
            className="max-h-32 w-auto max-w-[70%] sm:max-w-[90%]"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white sm:text-3xl">
            3.000,00$ Prize Pool
          </h2>
          <h2 className="text-sm font-bold text-white">
            ENTROPRETTY Competition @ Winter Assembly 2025
          </h2>

          <p className="text-xs text-gray-300">
            Join us at Messukeskus, Helsinki from February 20th to February
            23rd, 2025 for an unforgettable experience.
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            variant="link"
            className="text-white hover:text-gray-300"
            asChild
          >
            <a
              href="https://assembly.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more at assembly.org
            </a>
          </Button>
          {/* <Button variant="secondary" className="hover:bg-gray-700">
            Dismiss
          </Button> */}
        </div>
      </div>
    </div>
  )
}
