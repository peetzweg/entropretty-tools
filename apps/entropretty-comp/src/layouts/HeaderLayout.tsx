import { Link, Outlet } from "react-router"
import { useAuth } from "../contexts/auth-context"
import { Button } from "../components/ui/button"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()

  console.log({ user })
  return (
    <div className="flex h-screen w-screen flex-col">
      <aside className="flex flex-row items-center justify-end gap-2 p-2">
        {!user && (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}
        {user && (
          <>
            <div>{user.email}</div>
            <Button>
              <Link to="/create">Create</Link>
            </Button>
            <Button variant={"ghost"} onClick={signOut}>
              Logout
            </Button>
          </>
        )}
      </aside>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  )
}
