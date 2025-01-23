import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { z } from "zod"
import { editorCodeAtom, remixAtom } from "./atoms"

const createFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is not optional")
    .max(50, "Name must be 50 characters or less"),
})

type CreateFormValues = z.infer<typeof createFormSchema>

export const CreateActions = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const [editorCode] = useAtom(editorCodeAtom)
  const [remix] = useAtom(remixAtom)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
  })

  const createAlgorithm = useMutation({
    mutationFn: async (data: CreateFormValues) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("You must be logged in to create an algorithm")
      }

      const { data: insertedAlgorithm, error: insertError } = await supabase
        .from("algorithms")
        .insert({
          content: editorCode,
          name: data.name,
          user_id: user.id,
          remix_of: remix?.id || undefined,
          like_count: 0,
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message)
      }

      return insertedAlgorithm
    },
    onSuccess: (data) => {
      console.info("Successfully created algorithm", data)
      reset()
      setError(null)
      queryClient.invalidateQueries({ queryKey: ["algorithms", "latest"] })
      navigate(`/`)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })

  const onSubmit = (data: CreateFormValues) => {
    createAlgorithm.mutate(data)
  }

  return (
    <div className="absolute bottom-2 left-2 right-2 flex w-full flex-row items-center justify-center p-2">
      <div className="flex flex-col gap-2 rounded-md bg-white p-2 shadow-lg">
        {" "}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
          <div>
            <Input {...register("name")} placeholder="Algorithm Name" />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={createAlgorithm.isPending}>
            {createAlgorithm.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                POSTING...
              </>
            ) : (
              "POST"
            )}
          </Button>
        </form>
        {remix && (
          <div className="px-1">
            <div className="text-xs">{`* Will be marked as remix of ${remix.id}`}</div>
          </div>
        )}
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
    </div>
  )
}
