import { HelpMenu } from "@/components/HelpMenu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { useUserProfile } from "../hooks/useUserProfile"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: profile, isLoading: isLoadingProfile } = useUserProfile()

  useEffect(() => {
    // Set random favicon
    const randomFaviconNumber = Math.floor(Math.random() * 3) + 1
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (!link) {
      const newLink = document.createElement("link")
      newLink.rel = "icon"
      document.head.appendChild(newLink)
    }
    ;(document.querySelector("link[rel~='icon']") as HTMLLinkElement).href =
      `/favicon/${randomFaviconNumber}.png`
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col">
      <nav className="relative flex flex-row items-center justify-between gap-2 border-b border-gray-200 px-6 py-2">
        <div className="flex flex-1 flex-row items-center justify-start gap-2">
          <Button
            asChild
            variant={"link"}
            className={cn(location.pathname === "/new" && "underline")}
          >
            <Link to="/new">new</Link>
          </Button>

          <Button
            asChild
            variant={"link"}
            className={cn(
              (location.pathname === "/hot" || location.pathname === "/") &&
                "underline",
            )}
          >
            <Link to="/">hot</Link>
          </Button>

          {user && (
            <Button
              asChild
              variant={"link"}
              className={cn(location.pathname === "/mine" && "underline")}
            >
              <Link to="/mine">mine</Link>
            </Button>
          )}
          <HelpMenu />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="font-jersey hidden flex-row gap-1 text-3xl lg:flex">
            <div>Entropretty</div>
            <div className="text-brand-blue text-sm">BETA</div>
          </div>
        </div>
        <div className="flex flex-1 flex-row items-center justify-end gap-2">
          {!user && (
            <>
              <Button className="hidden md:block" asChild>
                <Link to="/login">LOGIN</Link>
              </Button>
              <Button variant={"ghost"} className="hidden md:block" asChild>
                <Link to="/signup">SIGN UP</Link>
              </Button>
            </>
          )}
          {user && (
            <>
              {!isLoadingProfile && (
                <Button variant="ghost" asChild>
                  <Link to="/profile">{profile?.username || user.email}</Link>
                </Button>
              )}
              {location.pathname !== "/create" && (
                <Button className="hidden md:flex" asChild>
                  <Link to="/create" className="flex items-center gap-1">
                    <PlusIcon className="h-4 w-4" />
                    NEW
                  </Link>
                </Button>
              )}
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
