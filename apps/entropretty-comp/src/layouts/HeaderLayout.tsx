import { HelpMenu } from "@/components/HelpMenu"
import { NewDialog } from "@/components/NewDialog"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { useUserProfile } from "../hooks/useUserProfile"
import { Helmet } from "react-helmet-async"

export default function HeaderLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { data: profile, isLoading: isLoadingProfile } = useUserProfile()

  const randomFaviconNumber = Math.floor(Math.random() * 13) + 1

  return (
    <div className="flex h-screen w-screen flex-col">
      <Helmet>
        <meta property="og:image" content="/open-graph-dynamic.png" />
        <link id="favicon" rel="icon" href={`/favicon/${randomFaviconNumber}.png`} />
      </Helmet>
      <nav className="relative flex flex-row items-center justify-between gap-2 border-b border-gray-200 px-6 py-2">
        <div className="flex flex-1 flex-row items-center justify-start gap-2">
          <Button
            asChild
            variant={"link"}
            className={cn(
              (location.pathname === "/new" || location.pathname === "/") &&
                "underline",
            )}
          >
            <Link to="/new">new</Link>
          </Button>

          <Button
            asChild
            variant={"link"}
            className={cn(location.pathname === "/hot" && "underline")}
          >
            <Link to="/hot">hot</Link>
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
          <Button asChild variant={"link"}>
            <Link to="https://x.com/entropretty" target="_blank">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </Button>
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
              {location.pathname !== "/create" && <NewDialog />}
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
