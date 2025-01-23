import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { Button } from "../components/ui/button"
import { useAuth } from "../contexts/auth-context"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen w-screen flex-col">
      <nav className="flex flex-row items-center justify-between gap-2 border-b border-gray-200 px-6 py-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="text-xl font-bold">ENTROPRETTY</div>
          <Button
            asChild
            variant={"link"}
            className={cn(location.pathname === "/" && "underline")}
          >
            <Link to="/">LATEST</Link>
          </Button>

          <Button
            asChild
            variant={"link"}
            className={cn(location.pathname === "/best" && "underline")}
          >
            <Link to="/best">BEST</Link>
          </Button>

          {user && (
            <Button
              asChild
              variant={"link"}
              className={cn(location.pathname.startsWith("/u/") && "underline")}
            >
              <Link to={`/u/${user.id}`}>MY CREATIONS</Link>
            </Button>
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
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
      </nav>
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  )
}
