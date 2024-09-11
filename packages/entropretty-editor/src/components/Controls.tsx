import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/state";
import { LayersIcon, StackIcon } from "@radix-ui/react-icons";

export const Controls = () => {
  const changeMode = useApp((state) => state.changeMode);

  const schemas = useApp((state) => state.schemas);
  const selectedSchema = useApp((state) => state.schema);
  const setSchema = useApp((state) => state.setSchema);
  const mode = useApp((state) => state.mode);
  return (
    <nav
      className={cn(
        "fixed bottom-4 left-4 flex flex-row items-center justify-center rounded-xl overflow-hidden border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/30 transition-all duration-300 ease-in-out"
      )}
    >
      <div className="w-24 text-background bg-foreground px-4 h-9 flex flex-row items-center justify-center rounded-r-xl bg-slate-500">
        {mode}
      </div>
      <Select
        onValueChange={(newValue) => {
          setSchema(newValue);
        }}
        value={selectedSchema || undefined}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Schema" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {schemas.map((schema) => {
              return <SelectItem value={schema}>{schema}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => changeMode("explore")}
      >
        <LayersIcon />
      </Button>

      <Button
        className="flex gap-1 px-2"
        variant={"ghost"}
        onClick={() => changeMode("picked")}
      >
        <StackIcon />
      </Button>
    </nav>
  );
};
