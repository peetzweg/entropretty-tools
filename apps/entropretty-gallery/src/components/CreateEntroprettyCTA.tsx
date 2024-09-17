import AnimatedShinyText from "@/components/magicui/animated-shiny-text"
import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"

export const CreateEntroprettyCTA: React.FC<{ className?: string }> = ({
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
    <div
      className={cn(
        "group flex h-10 w-fit items-center justify-center rounded-md border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        className,
      )}
      onMouseDown={handleCopy}
    >
      <AnimatedShinyText className="group inline-flex items-center justify-center px-4 py-1 transition ease-in hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span>{copyText}</span>

        {isCopied ? (
          <CheckIcon className="ml-4 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-110" />
        ) : (
          <CopyIcon className="ml-4 size-3 opacity-75 transition-all duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:scale-110 group-hover:opacity-100" />
        )}
      </AnimatedShinyText>
    </div>
  )
}
