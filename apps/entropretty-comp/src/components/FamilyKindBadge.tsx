import { AlgorithmView } from "@/lib/helper.types"
import { cn, familyKindLabel } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface FamilyKindBadgeProps {
  algorithm: AlgorithmView
  className?: string
}

export function FamilyKindBadge({
  algorithm,
  className,
}: FamilyKindBadgeProps) {
  if (!algorithm.family_kind) return null

  return (
    <Badge className={cn(className)} variant={algorithm.family_kind}>
      {`${familyKindLabel(algorithm.family_kind!)}`}
    </Badge>
  )
}
