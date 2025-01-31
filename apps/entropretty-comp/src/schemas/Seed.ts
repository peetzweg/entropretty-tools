import { z } from "zod"

export const seedSchema = z.object({
  values: z
    .array(z.number().min(0).max(255))
    .length(4)
    .or(z.array(z.number().min(0).max(255)).length(8)),
})

export type SeedSchema = z.infer<typeof seedSchema>

