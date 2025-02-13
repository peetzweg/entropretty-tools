import { FeedbackDialog } from "@/components/FeedbackDialog"
import {
  TOAST_ID,
  WinterAssemblyToast,
} from "@/components/toasts/WinterAssemblyToast"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useOneTimeToast } from "@/hooks/useOneTimeToast"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useOneTimeToast(WinterAssemblyToast, {
    toastId: TOAST_ID,
  })

  return (
    <div className="flex h-screen w-screen flex-col">
      <nav className="flex flex-row items-center justify-between gap-2 border-b border-gray-200 px-6 py-2">
        <div className="flex flex-1 flex-row items-center justify-start gap-2">
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
            <>
              <Button
                asChild
                variant={"link"}
                className={cn(location.pathname === "/mine" && "underline")}
              >
                <Link to="/mine">MINE</Link>
              </Button>

              <FeedbackDialog />
            </>
          )}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="font-jersey hidden text-3xl md:block">
            Entropretty
          </div>
        </div>
        <div className="flex flex-1 flex-row items-center justify-end gap-2">
          {!user && (
            <Button asChild>
              <Link to="/login">LOGIN</Link>
            </Button>
          )}
          {user && (
            <>
              {location.pathname !== "/create" && (
                <Button asChild>
                  <Link to="/create" className="flex items-center gap-1">
                    <PlusIcon className="h-4 w-4" />
                    NEW
                  </Link>
                </Button>
              )}
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
      <main className="flex h-full w-full flex-col items-center">
        <Outlet />
      </main>
    </div>
  )
}
