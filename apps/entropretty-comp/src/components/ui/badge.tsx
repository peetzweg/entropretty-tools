import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn, familyKindColor } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 text-sm font-jersey transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        Procedural: `border-transparent ${familyKindColor("Procedural")} text-primary-foreground`,
        ProceduralAccount: `border-transparent ${familyKindColor("ProceduralAccount")} text-primary-background`,
        ProceduralPersonal: `border-transparent ${familyKindColor("ProceduralPersonal")} text-primary-background`,
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
