import { Skeleton } from "@/components/ui/skeleton"

export function AlgorithmCardSkeleton() {
  return (
    <div className="mx-auto my-4 max-w-xl">
      <Skeleton className="flex aspect-square w-full rounded-none" />
    </div>
  )
}
