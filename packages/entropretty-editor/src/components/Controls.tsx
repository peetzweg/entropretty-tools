import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/state"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export const Controls = () => {
  const cycleMode = useApp((state) => state.cycleMode)
  const mode = useApp((state) => state.mode)
  const schema = useApp((state) => state.schema)
  const showControls = useApp((state) => state.showControls)
  const toggleControls = useApp((state) => state.toggleControls)
  const refreshSeeds = useApp((state) => state.refreshSeeds)
  const toggleDetails = useApp((state) => state.toggleDetails)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "q") {
        cycleMode()
      }
      if (event.key === "w") {
        toggleControls()
      }
      if (event.key === "e") {
        refreshSeeds()
      }
      if (event.key === "r") {
        location.reload()
      }
      if (event.key === "d") {
        toggleDetails()
      }

      console.log(event.key)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [cycleMode, toggleControls])

  if (!schema) return null

  return (
    <>
      <nav
        className={cn(
          "bg-background/95 supports-[backdrop-filter]:bg-background/30 fixed bottom-4 left-4 flex flex-row items-center justify-center overflow-hidden rounded-md border pr-4 text-sm backdrop-blur transition-all duration-300 ease-in-out",
          { hidden: !showControls },
        )}
      >
        <div
          className={cn(
            "flex h-10 w-fit flex-row items-center justify-center rounded-r-md px-4",
            {
              "bg-yellow-400": schema.kind === "Procedural",
              "bg-blue-400": schema.kind === "ProceduralAccount",
              "bg-red-400": schema.kind === "ProceduralPersonal",
            },
          )}
        >
          {schema?.kind}
        </div>

        <Button variant={"ghost"} onClick={cycleMode}>
          {`(q) ${mode}`}
        </Button>
        <div className="flex flex-row gap-2">
          <div onClick={toggleControls} className="text-muted-foreground">
            (w) hide
          </div>
          <div className="text-muted-foreground">(e) new seed</div>
          <div className="text-muted-foreground">(r) reload</div>
          <div className="text-muted-foreground" onMouseDown={toggleDetails}>
            (d) details
          </div>
        </div>
      </nav>
      {!showControls && (
        <Button
          variant={"ghost"}
          onMouseDown={toggleControls}
          className="text-muted-foreground fixed bottom-4 left-4 h-10 text-sm"
        >
          show
        </Button>
      )}
    </>
  )
}
