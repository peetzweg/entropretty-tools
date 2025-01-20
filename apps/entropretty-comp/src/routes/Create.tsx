import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { useAuth } from "../contexts/auth-context"
import { remixAtom } from "../features/create/atoms"
import CodeEditor from "../features/create/CodeEditor"
import { AlgorithmView } from "../lib/helper.types"

function Create() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const remixId = searchParams.get("remix")
  const [, setRemix] = useAtom(remixAtom)

  const { isLoading } = useQuery({
    queryKey: ["algorithm", remixId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .eq("id", remixId)
        .single()

      if (error) throw error
      if (!data) return
      setRemix(data as AlgorithmView)
    },
    enabled: !!remixId,
  })

  useEffect(() => {
    return () => setRemix(null)
  }, [setRemix])
  useEffect(() => {
    if (!remixId) {
      setRemix(null)
    }
  }, [remixId, setRemix])

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [navigate, user])

  return <>{!isLoading && <CodeEditor />}</>
}

export default Create
