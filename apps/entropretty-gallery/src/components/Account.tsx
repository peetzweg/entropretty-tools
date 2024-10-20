import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/state"
import { useQueryUser } from "../hooks/useQueryUser"

function Account() {
  const supabase = useApp((state) => state.supabase)
  const { data: user, isLoading } = useQueryUser()
  console.log({ user, isLoading })

  return (
    <div className="absolute right-0 top-0 flex flex-row items-center justify-center gap-4 bg-white">
      {!isLoading && user && (
        <>
          <div className="text-sm">{user.user_metadata.user_name}</div>
          <Button
            variant={"ghost"}
            onClick={() => {
              supabase.auth.signOut()
            }}
          >
            Logout
          </Button>
        </>
      )}
      {!isLoading && !user && (
        <Button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: "http://localhost:5173/auth-callback",
              },
            })
          }
        >
          Sign in with GitHub
        </Button>
      )}
    </div>
  )
}

export default Account
