import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

export function useUsersLikes() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["user-likes", user?.id],
    queryFn: async () => {
      if (!user) return []

      const { data, error } = await supabase
        .from("likes")
        .select("algorithm_id")
        .eq("user_id", user.id)

      if (error) throw error
      return data.map((like) => like.algorithm_id)
    },
    enabled: !!user,
  })
}
