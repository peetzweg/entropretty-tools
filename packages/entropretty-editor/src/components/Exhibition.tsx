import { DrawingBitmap } from "@/components/DrawingBitmap";
import { getSeedFamily, seedToKey } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  schema: string;
}
function Exhibition({ schema }: Props) {
  const families = useMemo(() => {
    return Array(8)
      .fill(1)
      .map(() => getSeedFamily("Procedural"));
  }, []);

  const [focusSize, gridSize, rowSize] = useMemo(() => {
    const innerWidth = window.innerWidth;
    return [innerWidth / 2, innerWidth / 8, innerWidth / 16];
  }, []);

  return (
    <div className="flex flex-col">
      {families[0] && (
        <div className="flex flex-row flex-wrap justify-start items-start">
          <div>
            <DrawingBitmap
              key={seedToKey(families[0][0])}
              schema={schema}
              seed={families[0][0]}
              size={focusSize}
            />
          </div>
          <div className="grid grid-cols-4">
            {families[0].map((seed) => (
              <DrawingBitmap
                key={seedToKey(seed)}
                schema={schema}
                seed={seed}
                size={gridSize}
              />
            ))}
          </div>
        </div>
      )}
      {families.map((seeds, index) => (
        <div className="flex flex-row" key={`seed_family_${index}`}>
          {seeds.map((seed) => (
            <DrawingBitmap
              key={seedToKey(seed)}
              schema={schema}
              seed={seed}
              size={rowSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Exhibition;
