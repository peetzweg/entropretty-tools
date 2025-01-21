import { Link, Outlet, useNavigate } from "react-router"
import { useAuth } from "../contexts/auth-context"
import { Button } from "../components/ui/button"
import { PlusIcon } from "lucide-react"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen flex-col">
      <aside className="flex flex-row items-center justify-between gap-2 border-b border-gray-200 p-2">
        <Button asChild variant={"link"}>
          <Link to="/" className="flex items-center gap-1">
            EXPLORE
          </Link>
        </Button>
        <div className="flex flex-row items-center justify-center gap-2 px-4">
          {!user && (
            <Button asChild>
              <Link to="/login">LOGIN</Link>
            </Button>
          )}
          {user && (
            <>
              <Button asChild>
                <Link to="/create" className="flex items-center gap-1">
                  <PlusIcon className="h-4 w-4" />
                  NEW
                </Link>
              </Button>
              <div className="px-4">{user.email}</div>
              <Button
                variant={"ghost"}
                onMouseDown={() => {
                  signOut()
                    .then(() => {
                      navigate("/")
                    })
                    .catch((e) => {
                      console.error(e)
                    })
                }}
              >
                LOGOUT
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
