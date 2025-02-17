import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Username } from "./components/Username"

export function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .limit(1)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!user,
  })

  if (!user) {
    navigate("/login")
    return null
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-start gap-4 overflow-y-scroll p-4">
        <div>
          <h3 className="text-md font-medium">Loading...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 overflow-y-scroll p-4">
      <div>
        <h3 className="text-md font-medium">Profile</h3>
        <p className="text-muted-foreground text-xs">
          This is how others will see you on the site.
        </p>
      </div>

      <Username profile={profile} />
    </div>
  )
}
