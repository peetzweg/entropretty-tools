import { Button } from "./ui/button"
import { useEffect, useState } from "react"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // Set the target date to April 19th, 2025 at 6:00 PM UTC
    // This will be converted to the appropriate local time by the browser
    const targetDate = new Date("2025-04-19T18:00:00Z")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return null
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { hours, minutes, seconds }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isExpired) {
    return (
      <div className="font-bold">
        <p className="text-center font-bold text-red-500">
          Submission is Closed
        </p>
        <p className="text-center">DEMO TOMORROW AT 2:30 PM CEST</p>
      </div>
    )
  }

  if (!timeLeft) {
    return null
  }

  return (
    <div className="flex space-x-2 text-white">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </span>
        <span className="text-xs">HOURS</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-xs">MINUTES</span>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
        <span className="text-xs">SECONDS</span>
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-lg uppercase text-white">
          ONGOING: Global Competition
        </div>
      </div>
      <div className="flex flex-col gap-2 text-gray-300">
        <p className="leading-6">
          Don't forget to submit the link to your algorithm to the REVISION
          Partymeister system!
        </p>
        <p className="leading-6">
          Don't have an Revision ticket? Tweet at us{" "}
          <a
            href="https://x.com/entropretty"
            className="text-white underline"
            target="_blank"
          >
            @Entropretty
          </a>{" "}
          on Twitter to submit your Entry!
        </p>
      </div>
      <div className="flex flex-col gap-2 text-gray-300">
        <Button asChild variant={"link"} className="text-base">
          <a className="text-white" href="https://pm.revision-party.net/start">
            {`> SUBMIT TO PARTYMEISTER 🎉`}
          </a>
        </Button>
      </div>
    </div>
  )
}

export function RevisionPromotionCard() {
  return (
    <div className="mx-auto flex w-screen flex-col overflow-hidden border bg-black text-white sm:flex-col md:w-[682px]">
      <div className="relative aspect-video h-48 w-full sm:aspect-video sm:h-48">
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
      </div>

      <div className="space-y-4 p-4 px-4 pb-4 pt-2">
        <div className="relative space-y-4">
          <Content />
          <div className="mt-4 flex justify-center">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  )
}
