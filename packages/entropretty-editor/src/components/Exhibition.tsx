import { DrawingBitmap } from "@/components/DrawingBitmap";
import { cn, getSeedFamily, seedToKey } from "@/lib/utils";
import { useMemo } from "react";
import { SchemaMetadata } from "../types";
import { useApp } from "../lib/state";

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

  const [focusSize, gridSize, rowSize] = useMemo(() => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    console.log({ innerHeight, innerWidth });

    const focusSize = {
      horizontal: innerWidth / 2,
      vertical: innerHeight / 2,
      grid: 0,
      single: innerHeight,
    }[mode];

    const gridSize = {
      horizontal: innerWidth / 8,
      vertical: innerHeight / 8,
      grid: innerHeight / 4,
      single: 0,
    }[mode];

    return [focusSize, gridSize, innerWidth / 16];
  }, [mode]);

  console.log({ focusSize, gridSize });

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
      {/*
      {families.map((seeds, index) => (
        <div className="flex flex-row" key={`seed_family_${index}`}>
          {seeds.map((seed) => (
            <DrawingBitmap
              key={seedToKey(seed)}
              schema={schema.name}
              seed={seed}
              size={rowSize}
            />
          ))}
        </div>
      ))} */}
    </div>
  );
}

export default Exhibition;
