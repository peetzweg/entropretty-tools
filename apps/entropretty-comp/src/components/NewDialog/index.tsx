import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn, familyKindColor, familyKindLabel } from "@/lib/utils"
import { FamilyKind } from "entropretty-utils"
import { ArrowUpRight, PlusIcon } from "lucide-react"
import { Link, useNavigate } from "react-router"

interface SeedTypeCardProps {
  kind: FamilyKind
}

function SeedTypeCard({ kind }: SeedTypeCardProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/create?type=${kind}`)}
      className={cn(
        "flex aspect-square w-full flex-col items-center justify-center gap-2 border p-4 transition-colors hover:opacity-90",
        familyKindColor(kind),
        kind === "Procedural"
          ? "text-primary-foreground"
          : "text-primary-background",
      )}
    >
      <div className="font-jersey text-xl">{familyKindLabel(kind)}</div>
      <div className="text-sm">
        {kind === "Procedural" && "4 random bytes for creative designs"}
        {kind === "ProceduralPersonal" && "8 bytes for personal identifiers"}
        {kind === "ProceduralAccount" && "32 bytes for account-based designs"}
      </div>
    </button>
  )
}

export function NewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden md:flex">
          <div className="flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            NEW
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Choose your Seed Category
          </DialogTitle>
        </DialogHeader>
        <Alert variant="info">
          <AlertDescription className="text-xs">
            Remember:{" "}
            <Link
              className="hover:text-brand-blue/80 underline"
              to="https://entropretty.com/rules#2-determinism-uniqueness"
              target="_blank"
            >
              Rule 2.3 Determinism & Uniqueness{" "}
            </Link>
            <br />
            Every byte of the seed should be encoded into the design. Not using
            all bytes will result in a poor uniqueness rating.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <SeedTypeCard kind="Procedural" />
            <div className="text-muted-foreground space-y-0.5 text-center text-xs">
              <div>1st Place: 142 $DOT</div>
              <div>2nd Place: &nbsp;47 $DOT</div>
            </div>
          </div>
          <div className="space-y-2">
            <SeedTypeCard kind="ProceduralPersonal" />
            <div className="text-muted-foreground space-y-0.5 text-center text-xs">
              <div>1st Place: 142 $DOT</div>
              <div>2nd Place: &nbsp;47 $DOT</div>
            </div>
          </div>
          <div className="space-y-2">
            <SeedTypeCard kind="ProceduralAccount" />
            <div className="text-muted-foreground space-y-0.5 text-center text-xs">
              <div>1st Place: 142 $DOT</div>
              <div>2nd Place: &nbsp;47 $DOT</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="link" asChild>
            <Link
              to="https://entropretty.com/rules#seed-details"
              target="_blank"
              className="text-primary hover:underline"
            >
              Learn about seed types & meaning
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
