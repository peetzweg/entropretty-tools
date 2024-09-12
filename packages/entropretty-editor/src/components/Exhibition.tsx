import { DrawingBitmap } from "@/components/DrawingBitmap";
import { cn, getSeedFamily, seedToKey } from "@/lib/utils";
import { useMemo } from "react";
import { SchemaMetadata } from "@/types";
import { useApp } from "@/lib/state";

interface Props {
  schema: SchemaMetadata;
}

function Exhibition({ schema }: Props) {
  const families = useMemo(() => {
    return Array(8)
      .fill(1)
      .map(() => getSeedFamily(schema.kind));
  }, [schema.kind]);

  const mode = useApp((s) => s.mode);

  const [focusSize, gridSize] = useMemo(() => {
    const innerWidth = window.innerWidth || 1000;
    const innerHeight = window.innerHeight || 1000;

    const focus = {
      horizontal: innerWidth / 2,
      vertical: innerHeight / 2,
      grid: 0,
      single: innerHeight < innerWidth ? innerHeight : innerWidth,
    }[mode];

    const grid = {
      horizontal: innerWidth / 8,
      vertical: innerHeight / 8,
      grid: innerHeight < innerWidth ? innerHeight / 4 : innerWidth / 4,
      single: 0,
    }[mode];

    return [focus, grid];
  }, [mode]);

  return (
    <div className="flex flex-col">
      {families[0] && (
        <div
          className={cn("flex justify-start items-start", {
            "flex-row": mode === "horizontal",
            "flex-col": mode === "vertical",
          })}
        >
          <div className="overflow-hidden">
            <DrawingBitmap
              key={seedToKey(families[0][0])}
              schema={schema.name}
              seed={families[0][0]}
              size={focusSize}
            />
          </div>
          <div className="grid grid-cols-4">
            {families[0].map((seed) => (
              <div key={seedToKey(seed)} className="overflow-hidden">
                <DrawingBitmap
                  schema={schema.name}
                  seed={seed}
                  size={gridSize}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Exhibition;
