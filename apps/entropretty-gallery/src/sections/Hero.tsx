import HyperText from "@/components/magicui/hyper-text"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { CreateEntroprettyCTANeon } from "../components/CreateEntroprettyCTANeon"

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-start gap-6">
      <div className="flex flex-col items-baseline">
        <div className="w-2/3 font-serif text-4xl text-black sm:text-5xl dark:text-white">
          Contribute to{" "}
          <span className="keyword-sans font-semibold">Proof of Ink</span> with
        </div>

        <HyperText
          duration={2000}
          className="p-0 font-mono text-4xl font-bold text-black sm:text-5xl dark:text-white"
          text="× ENTROPRETTY "
        />
      </div>

      <p>
        <span className="keyword-sans font-semibold">Proof of Ink</span> will
        enable humans to prove their individuality in a privacy-preserving
        manner through a unique tattoo serving as proof to become a{" "}
        <span className="keyword-serif font-semibold">Web3 Citizen</span>.
      </p>

      <div className="flex w-fit flex-row justify-start gap-x-4 gap-y-2">
        <Link to="https://github.com/peetzweg/entropretty-tools?tab=readme-ov-file#submit-a-design">
          <Button className="text-base font-semibold" size={"lg"}>
            Submit Design
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/">
          <Button variant={"outline"} className="text-base" size={"lg"}>
            Gallery
          </Button>
        </Link>
        <a href="https://github.com/peetzweg/entropretty-tools" target="_blank">
          <Button className="text-base" variant={"link"}>
            Help building entropretty
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
      </div>

      <div className="flex flex-col items-center gap-10 pt-20">
        <h2 className="font-serif">Get Started</h2>
        <CreateEntroprettyCTANeon />
      </div>
    </div>
  )
}
