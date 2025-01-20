import { useState } from "react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }

      navigate("/")
    } catch (error) {
      console.error("Authentication error:", error)
      // Handle error (show message to user)
    }
  }

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h1 className="mb-5 text-2xl font-bold">
        {isSignUp ? "Sign Up" : "Login"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </Button>
      </p>
    </div>
  )
}
