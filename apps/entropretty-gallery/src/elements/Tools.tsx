import { ArrowUpRight } from "lucide-react"
import { CreateEntroprettyCTA } from "@/components/CreateEntroprettyCTA"

import { Button } from "@/components/ui/button"
import Details from "./Details.png"
import Families from "./Families.png"
import Single from "./Single.png"
import Horizontal from "./Horizontal.png"
import Marquee from "@/components/magicui/marquee"
export const Tools: React.FC = () => {
  return (
    <div className="flex w-full max-w-[720px] flex-col items-center justify-center gap-10 self-center">
      <h2 className="leading-tight">
        ×<span className="keyword-serif"> Designing with </span>
        <span className="rounded-lg bg-slate-200 p-1 lowercase">
          entropretty
        </span>
      </h2>

      <div className="flex flex-col justify-center gap-3">
        <p>
          We created a set of tools to help you create your own schema for{" "}
          <span className="whitespace-nowrap font-sans font-semibold italic">
            Proof of Ink
          </span>
          , called{" "}
          <span className="rounded-sm bg-slate-200 p-1 lowercase">
            entropretty
          </span>
          .{" "}
        </p>

        <p>
          You can create a entropretty workspace by running{" "}
          <span className="keyword-code">npm create entropretty</span>. We will
          guide you through creating workspace which is right for you. If you
          are a <span className="rounded-sm bg-yellow-400 p-1">Vanilla</span>{" "}
          Javascript or a{" "}
          <span className="rounded-sm bg-blue-400 p-1">TypeScript</span> user,
          the CLI has a template for you.
        </p>

        <CreateEntroprettyCTA className="self-center" />

        <p className="mt-3 max-w-[720px] self-center">
          All templates set you up with the{" "}
          <span className="keyword-code">entropretty-cli</span>,{" "}
          <span className="keyword-code">entropretty-editor</span> and{" "}
          <span className="keyword-code">entropretty-utils</span>.
        </p>
        <p className="ml-10">
          × <span className="keyword-code">entropretty-utils</span> is a
          collection of helper functions making your live easier creating unique
          designs for each given seed.
        </p>
        <p className="ml-10">
          × The <span className="keyword-code">entropretty-editor</span> is a
          web interface which renders your design for you for with different
          seeds. So you can explore how your code behaves to different input.
        </p>

        <p className="ml-10">
          × and the <span className="keyword-code">entropretty-cli</span> ties
          it all together. Providing you with commands to run the editor on a
          local machine, bundle your source code and test your design for
          compliance.
        </p>

        <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
          <Marquee pauseOnHover className="[--duration:40s]">
            {[Details, Families, Single, Horizontal].map((image, index) => (
              <img
                key={"marquee-" + index}
                src={image}
                className="w-[720px] rounded-md ring-slate-500 hover:ring-1"
              />
            ))}
          </Marquee>
        </div>

        <p>
          This suite of tools are heavily inspired by the initial version of{" "}
          <span className="keyword-code">entropretty</span>, which is build by{" "}
          <span className="whitespace-nowrap">Gavin Wood</span>. It is still in
          use and relevant. It can be accessed at:
        </p>
        <a
          href="https://github.com/gavofyork/entropretty"
          className="self-center"
          target="_blank"
        >
          <Button variant="link" className="text-base">
            github.com/gavofyork/entropretty{" "}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  )
}
