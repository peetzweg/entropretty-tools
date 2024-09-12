import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/state";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export const Controls = () => {
  const cycleMode = useApp((state) => state.cycleMode);
  const mode = useApp((state) => state.mode);
  const schema = useApp((state) => state.schema);
  const showControls = useApp((state) => state.showControls);
  const toggleControls = useApp((state) => state.toggleControls);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log({ event });
      if (event.key === "q") {
        cycleMode();
      }
      if (event.key === "w") {
        toggleControls();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cycleMode, toggleControls]);

  if (!schema) return null;

  return (
    <>
      <nav
        className={cn(
          "fixed text-sm bottom-4 left-4 flex flex-row items-center justify-center rounded-xl overflow-hidden border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/30 transition-all duration-300 ease-in-out pr-4",
          { hidden: !showControls }
        )}
      >
        <div
          className={cn(
            "w-fit px-4 h-10 flex flex-row items-center justify-center rounded-r-xl",
            {
              "bg-yellow-400": schema.kind === "Procedural",
              "bg-blue-400": schema.kind === "ProceduralAccount",
              "bg-red-400": schema.kind === "ProceduralPersonal",
            }
          )}
        >
          {schema?.kind}
        </div>

        <Button variant={"ghost"} onClick={cycleMode}>
          {`(q) ${mode}`}
        </Button>
        <div className="flex flex-row gap-2">
          <div onClick={toggleControls} className="text-muted-foreground">
            (w) Hide
          </div>
          <div onClick={toggleControls} className="text-muted-foreground">
            (e) Refresh Seeds
          </div>
          <div className="text-muted-foreground">(r) Reload</div>
        </div>
      </nav>
      {!showControls && (
        <Button
          variant={"ghost"}
          onMouseDown={toggleControls}
          className="fixed text-sm text-muted-foreground left-4 bottom-4 h-10"
        >
          Controls
        </Button>
      )}
    </>
  );
};
