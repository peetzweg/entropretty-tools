import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const targetDate = new Date("2025-02-22T12:00:00+02:00")

      let difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        return { hours: "00", minutes: "00", seconds: "00" }
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      difference -= hours * (1000 * 60 * 60)

      const minutes = Math.floor(difference / (1000 * 60))
      difference -= minutes * (1000 * 60)

      const seconds = Math.floor(difference / 1000)

      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center space-x-1 font-mono text-4xl font-bold text-white">
        <span>{timeLeft.hours}</span>
        <span>:</span>
        <span>{timeLeft.minutes}</span>
        <span>:</span>
        <span>{timeLeft.seconds}</span>
      </div>
      <div className="text-lg text-gray-300">
        left until{" "}
        <Link
          className="underline hover:text-white"
          to="https://scene.assembly.org/entry/add/"
          target="_blank"
        >
          submissions to PARTYMAN
        </Link>{" "}
        close
      </div>
      <div className="text-lg text-gray-300">
        ensure you submission includes a screenshot
      </div>
    </div>
  )
}

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
            className="max-h-32 w-auto max-w-[70%] sm:max-w-[60%]"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white sm:text-2xl">
            <Link
              to="https://assembly.org/en/events/winter25/program/demoscene-competitions"
              target="_blank"
              className="underline"
            >
              $3000 Prize Pool
              <ArrowUpRight className="inline-block h-6 w-6" />
            </Link>
          </h2>
          <h2 className="text-lg font-bold text-white sm:text-base">
            ENTROPRETTY Competition @ Winter Assembly 2025
          </h2>

          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              The competition is{" "}
              <span className="font-bold">open globally</span>, anyone can
              enter!
            </p>
            <ul className="list-decimal space-y-1 pl-8 text-sm text-gray-300">
              <li>Code your own design or remix another and post it here!</li>
              <li>
                Make sure your algorithm{" "}
                <Link
                  className="text-white underline hover:cursor-pointer hover:text-gray-300"
                  to={"https://entropretty.com/rules"}
                  target="_blank"
                >
                  adheres to the rules
                  <ArrowUpRight className="inline-block h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  className="text-white underline hover:cursor-pointer hover:text-gray-300"
                  to={"https://scene.assembly.org/"}
                  target="_blank"
                >
                  Submit up to 3 Entropretty posts & Screenshot per category to
                  Partyman
                  <ArrowUpRight className="inline-block h-4 w-4" />
                </Link>
              </li>
            </ul>

            {/* <p className="text-sm text-gray-300">
              Winners and runner ups will be announced and demoed live on Sunday
              23rd of February at Assembly.
            </p> */}
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <CountdownTimer />
        </div>
      </div>
    </div>
  )
}
