import { useCallback } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"

interface WinterAssemblyToastProps {
  id: string | number
}

export const TOAST_ID = "winter-assembly-toast-v2"

export function WinterAssemblyToast({ id }: WinterAssemblyToastProps) {
  const onDismiss = useCallback(() => {
    localStorage.setItem(TOAST_ID, Date.now().toString())
    toast.dismiss(id)
  }, [id])

  return (
    <div className="overflow-hidden rounded-lg border bg-black text-white">
      <div className="relative h-48 w-full">
        <img
          src="/Assembly-Winter-25-1920x1080-bg.webp"
          alt="Assembly Winter 2025 Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assembly-winter-2025-logo.png"
            alt="Assembly Winter 2025 Logo"
            className="max-h-32 w-auto max-w-[90%]"
          />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="">
          <h2 className="text-xl font-bold text-white">
            ENTROPRETTY Competition @ Winter Assembly 2025
          </h2>
          <p className="text-gray-300"></p>
          <p className="text-gray-300">
            Join us at Messukeskus, Helsinki from February 20th to February
            23rd, 2025 for an unforgettable experience.
          </p>
        </div>

        <div className="flex items-center justify-between">
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
          <Button
            variant="secondary"
            onClick={onDismiss}
            className="hover:bg-gray-700"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  )
}
