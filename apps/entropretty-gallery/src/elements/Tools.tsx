import { ArrowUpRight } from "lucide-react"
import { CreateEntroprettyCTA } from "../components/CreateEntroprettyCTA"
import Safari from "../components/magicui/safari"
import { Button } from "../components/ui/button"
import EditorScreenshot from "./EntroprettyEditor.png"
export const Tools: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-10 self-center">
      <h2 className="leading-tight">
        ×<br /> create a schema with{" "}
        <span className="rounded-lg bg-slate-200 p-1 lowercase">
          entropretty
        </span>
      </h2>

      <div className="flex flex-col gap-3">
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
          <span className="whitespace-nowrap rounded-sm bg-slate-200 p-1 lowercase">
            npm create entropretty
          </span>
          . The CLI will guide you through creating a workspace which is right
          for you. If you are a{" "}
          <span className="rounded-sm bg-yellow-400 p-1">Vanilla</span>{" "}
          Javascript or a{" "}
          <span className="rounded-sm bg-blue-400 p-1">TypeScript</span> user,
          the CLI has a template for you.
        </p>

        <CreateEntroprettyCTA className="self-center" />

        <p>
          These tools are heavily inspired by the initial version of{" "}
          <span className="rounded-sm bg-slate-200 p-1 lowercase">
            entropretty
          </span>
          , which is build by{" "}
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

      <div className="relative">
        <Safari
          className="size-full"
          url="https://localhost:4242"
          src={EditorScreenshot}
        />
      </div>
    </div>
  )
}
