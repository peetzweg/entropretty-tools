import { createFileRoute } from "@tanstack/react-router"
import ProfilePage from "@/pages/Profile"

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Profile page",
      },
      {
        title: "Profile",
      },
    ],
  }),
})
