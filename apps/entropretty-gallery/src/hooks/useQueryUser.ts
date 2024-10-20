import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/lib/state"

export const useQueryUser = () => {
  const supabase = useApp((state) => state.supabase)
  return useQuery({
    enabled: supabase !== null || supabase !== undefined,
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        throw new Error(error.message)
      }
      return data.user
    },
  })
}
