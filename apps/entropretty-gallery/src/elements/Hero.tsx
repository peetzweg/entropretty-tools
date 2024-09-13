import AnimatedShinyText from "@/components/magicui/animated-shiny-text"
import HyperText from "@/components/magicui/hyper-text"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"

export const Hero: React.FC = () => {
  return (
    <div className="mt-20 flex flex-col justify-start gap-8">
      <div className="flex flex-col items-baseline">
        <div className="w-2/3 font-mono text-5xl font-bold uppercase text-black dark:text-white">
          Contribute to Proof of Ink with
        </div>
        <HyperText
          duration={4000}
          className="inline p-0 font-mono text-5xl font-bold text-black dark:text-white"
          text="ENTROPRETTY "
        />
      </div>

      <p>
        The new solution, “Proof-of-Ink,” will enable users to prove their
        digital individuality in a privacy-preserving manner through a unique
        tattoo serving as proof of digital citizenship.
      </p>
      <div className="flex w-fit flex-row flex-wrap-reverse justify-start gap-x-4 gap-y-2">
        <Button size={"lg"} variant={"outline"}>
          EXPLORE
        </Button>
        <CreateEntroprettyCTA />
      </div>
    </div>
  )
}

const CreateEntroprettyCTA: React.FC = () => {
  const [, copy] = useCopyToClipboard()
  const [isCopied, setIsCopied] = useState(false)
  const copyText = useMemo(() => "pnpm create entropretty@latest", [])
  const handleCopy = useCallback(() => {
    copy(copyText).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    })
  }, [copy, copyText])

  return (
    <div
      className={cn(
        "group flex h-10 items-center justify-center rounded-md border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
      )}
      onMouseDown={handleCopy}
    >
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-in hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
        <span>{copyText}</span>

        {isCopied ? (
          <CheckIcon className="ml-4 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        ) : (
          <CopyIcon className="ml-4 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        )}
      </AnimatedShinyText>
    </div>
  )
}
