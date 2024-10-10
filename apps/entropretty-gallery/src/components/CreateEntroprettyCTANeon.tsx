import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"
import { NeonGradientCard } from "./ui/neon-gradient-card"

export const CreateEntroprettyCTANeon: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [, copy] = useCopyToClipboard()
  const [isCopied, setIsCopied] = useState(false)
  const copyText = useMemo(() => "npm create entropretty@latest", [])
  const handleCopy = useCallback(() => {
    copy(copyText).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    })
  }, [copy, copyText])

  return (
    <NeonGradientCard
      className="group max-w-sm items-center justify-center bg-transparent text-center hover:cursor-pointer"
      onMouseDown={handleCopy}
    >
      <div
        className={cn(
          "group flex w-full items-center justify-center",
          className,
        )}
      >
        <span>{copyText}</span>

        {isCopied ? (
          <CheckIcon className="ml-4 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-110" />
        ) : (
          <CopyIcon className="ml-4 size-3 opacity-75 transition-all duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-110 group-hover:opacity-100" />
        )}
      </div>
    </NeonGradientCard>
  )
}
