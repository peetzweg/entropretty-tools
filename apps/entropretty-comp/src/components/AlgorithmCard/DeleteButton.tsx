import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmView } from "@/lib/helper.types"
import { supabase } from "@/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"

interface DeleteButtonProps {
  algorithm: AlgorithmView
}

export function DeleteButton({ algorithm }: DeleteButtonProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const canDelete = user?.id === algorithm.user_id

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!user || !canDelete) throw new Error("Unauthorized")

      const { error } = await supabase
        .from("algorithms")
        .delete()
        .eq("id", algorithm.id)
        .eq("user_id", user.id)

      if (error) throw error
      return algorithm.id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["algorithms"] })
    },
    onError: (error: Error) => {
      console.error("Error deleting algorithm:", error)
      toast.error("Error Deleting Algorithm: " + error.message)
    },
  })

  const handleDelete = useCallback(() => {
    deleteMutation.mutate()
  }, [deleteMutation])

  if (!canDelete) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  )
}
