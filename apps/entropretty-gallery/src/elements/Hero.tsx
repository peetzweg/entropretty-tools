import { CreateEntroprettyCTA } from "@/components/CreateEntroprettyCTA"
import HyperText from "@/components/magicui/hyper-text"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-start gap-10">
      <div className="flex flex-col items-baseline">
        <div className="w-2/3 font-serif text-4xl text-black sm:text-5xl dark:text-white">
          Contribute to{" "}
          <span className="keyword-sans font-semibold">Proof of Ink</span> with
        </div>

        <HyperText
          duration={4000}
          className="p-0 font-mono text-4xl font-bold text-black sm:text-5xl dark:text-white"
          text="× ENTROPRETTY "
        />
      </div>

      <p>
        The new solution,{" "}
        <b>
          <i>'Proof-of-Ink'</i>
        </b>{" "}
        will enable users to prove their digital individuality in a
        privacy-preserving manner through a unique tattoo serving as proof of
        digital citizenship.
      </p>

      <div className="flex w-fit flex-row flex-wrap-reverse justify-start gap-x-4 gap-y-2">
        <a href="#gallery">
          <Button size={"lg"} variant={"outline"}>
            EXPLORE
          </Button>
        </a>
        <CreateEntroprettyCTA />
      </div>

      <a href="https://github.com/peetzweg/entropretty-tools" target="_blank">
        <Button className="px-0 text-base" variant={"link"}>
          Improve entropretty with us <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </a>
    </div>
  )
}
