import { Link, Outlet, useNavigate } from "react-router"
import { useAuth } from "../contexts/auth-context"
import { Button } from "../components/ui/button"
import { PlusIcon } from "lucide-react"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  console.log({ user })
  return (
    <div className="flex h-screen w-screen flex-col">
      <aside className="flex flex-row items-center justify-between gap-2 border-b border-gray-200 p-2">
        <Button asChild variant={"link"}>
          <Link to="/" className="flex items-center gap-1">
            Explore
          </Link>
        </Button>
        <div className="flex flex-row items-center justify-center gap-2">
          {!user && (
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          )}
          {user && (
            <>
              <div>{user.email}</div>
              <Button asChild>
                <Link to="/create" className="flex items-center gap-1">
                  <PlusIcon className="h-4 w-4" />
                  New Algorithm
                </Link>
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => {
                  signOut()
                    .then(() => {
                      navigate("/")
                    })
                    .catch((e) => {
                      console.error(e)
                    })
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </aside>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  )
}
