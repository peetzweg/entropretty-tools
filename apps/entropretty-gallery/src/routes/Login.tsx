import { createClient } from "@supabase/supabase-js"
import { Button } from "../components/ui/button"

const supabaseUrl = "https://wsgteflykxoabinjrflu.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZ3RlZmx5a3hvYWJpbmpyZmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMTQyOTgsImV4cCI6MjA0NDg5MDI5OH0.gx0MYyMXX238qW9P69AM5meRR1Kv1jW9vbOzwSN8I1c"
const supabase = createClient(supabaseUrl, supabaseKey)

function Login() {
  return (
    <main className="relative m-4 flex flex-col gap-24">
      <h1>login</h1>
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
    </main>
  )
}

export default Login
