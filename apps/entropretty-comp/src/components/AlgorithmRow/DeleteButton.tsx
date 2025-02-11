import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { AlgorithmView } from "@/lib/helper.types"
import { supabase } from "@/lib/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

interface DeleteButtonProps {
  algorithm: AlgorithmView
}

export function DeleteButton({ algorithm }: DeleteButtonProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isConfirming, setIsConfirming] = useState(false)

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
      toast.success("Algorithm deleted successfully")
      setIsConfirming(false)
    },
    onError: (error: Error) => {
      console.error("Error deleting algorithm:", error)
      toast.error("Error Deleting Algorithm: " + error.message)
      setIsConfirming(false)
    },
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (isConfirming) {
      timeoutId = setTimeout(() => {
        setIsConfirming(false)
      }, 3000)
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isConfirming])

  const handleClick = useCallback(() => {
    if (isConfirming) {
      deleteMutation.mutate()
    } else {
      setIsConfirming(true)
    }
  }, [isConfirming, deleteMutation])

  if (!canDelete) return null

  return (
    <Button
      variant={isConfirming ? "destructive" : "ghost"}
      onClick={handleClick}
      disabled={deleteMutation.isPending}
      className="gap-2"
    >
      {deleteMutation.isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isConfirming ? (
        "YES, DELETE!"
      ) : (
        "DELETE"
      )}
    </Button>
  )
}
