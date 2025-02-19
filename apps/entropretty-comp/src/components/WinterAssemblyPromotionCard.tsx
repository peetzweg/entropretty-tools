import { Link } from "react-router"
import { Button } from "./ui/button"

export function WinterAssemblyPromotionCard() {
  return (
    <div className="mx-auto flex w-screen flex-col overflow-hidden border bg-black text-white sm:flex-col md:w-[682px]">
      <div className="relative aspect-video h-36 w-full sm:aspect-video sm:h-36">
        <img
          src="/Assembly-Winter-25-bg.webp"
          alt="Assembly Winter 2025 Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assembly-winter-2025-logo.png"
            alt="Assembly Winter 2025 Logo"
            className="max-h-32 w-auto max-w-[70%] sm:max-w-[80%]"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white sm:text-2xl">
            $3000 Prize Pool
          </h2>
          <h2 className="text-lg font-bold text-white sm:text-base">
            ENTROPRETTY Competition @ Winter Assembly 2025
          </h2>

          <p className="text-sm text-gray-300">
            The competition is open globally, anyone can enter!
          </p>
          <br />
          <ul className="list-decimal space-y-1 pl-5 text-sm text-gray-300">
            <li>Submit your own design or remix another and post it here</li>
            <li>
              Go to the{" "}
              {/* <Button variant={"link"} asChild>
                <Link to={"https://scene.assembly.org/"} target="_blank">
                  Assembly website
                </Link>{" "}
              </Button> */}
              and submit your 3 best entries
            </li>
            <li>Entries close 22nd February</li>
            <li>Winners will be announced on the 23rd of February</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button
            variant="link"
            className="text-sm text-white hover:text-gray-300"
            asChild
          >
            <a
              href="https://assembly.org/en/events/winter25"
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
