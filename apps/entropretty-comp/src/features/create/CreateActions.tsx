import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router"
import { useAtom } from "jotai"
import { editorCodeAtom } from "./atoms"

const createFormSchema = z.object({
  name: z.string().min(1).max(50, "Name must be 50 characters or less"),
})

type CreateFormValues = z.infer<typeof createFormSchema>

export const CreateActions = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [editorCode] = useAtom(editorCodeAtom)

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
        })
        .select()
        .single()

      if (insertError) {
        throw new Error(insertError.message)
      }

      return insertedAlgorithm
    },
    onSuccess: (data) => {
      reset()
      setError(null)
      navigate(`/a/${data.id}`)
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 rounded-md bg-white p-2 shadow-lg"
      >
        <div className="flex flex-col">
          <Input {...register("name")} placeholder="Algorithm Name" />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
        <Button type="submit" disabled={createAlgorithm.isPending}>
          {createAlgorithm.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </form>
    </div>
  )
}
