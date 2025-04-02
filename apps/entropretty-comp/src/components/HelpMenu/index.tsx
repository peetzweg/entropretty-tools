import { FeedbackDialog } from "@/components/FeedbackDialog"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export const ListItem = ({
  className,
  title,
  description,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
}) => {
  return (
    <div
      className={cn(
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:cursor-pointer",
        className,
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      {description && (
        <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
          {description}
        </p>
      )}
    </div>
  )
}

export function HelpMenu() {
  const { user } = useAuth()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>help</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 p-2 md:w-[300px] lg:w-[400px]">
              <div className="grid gap-1">
                {user && <FeedbackDialog />}
                <a href="https://entropretty.com/rules" target="_blank">
                  <ListItem
                    title="Competition Rules"
                    description="Learn about the rules of the competition"
                  />
                </a>

                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
                  target="_blank"
                >
                  <ListItem
                    title="Canvas API Reference"
                    description="Documentation for the CanvasRenderingContext2D API used for drawing"
                  />
                </a>
              </div>
              <a href="https://entropretty.com/" target="_blank">
                <ListItem
                  title="What is this?"
                  description="https://entropretty.com/"
                />
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
