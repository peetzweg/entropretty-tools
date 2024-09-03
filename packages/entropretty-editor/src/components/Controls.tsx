import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export const Controls = () => {
  return (
    <nav
      className={cn(
        "fixed bottom-4 right-4 flex flex-row items-center justify-center rounded-xl overflow-hidden border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/30 transition-all duration-300 ease-in-out"
      )}
    >
      <Button size={"icon"} variant={"ghost"}>
        <DashboardIcon />
      </Button>
    </nav>
  );
};
