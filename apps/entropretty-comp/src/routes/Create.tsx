import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { remixAtom } from "../features/create/atoms"
import CodeEditor from "../features/create/CodeEditor"
import { AlgorithmView } from "../lib/helper.types"

function Create() {
  const [searchParams] = useSearchParams()
  const remixId = searchParams.get("remix")
  const [, setRemix] = useAtom(remixAtom)
  console.log({ remixId })

  const { data, isLoading } = useQuery({
    queryKey: ["algorithm", remixId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_info")
        .select()
        .eq("id", remixId)
        .single()

      if (error) throw error

      if (!data) return
      return data as AlgorithmView
    },
    enabled: remixId !== null,
  })

  useEffect(() => {
    if (!data) {
      setRemix(null)
    } else {
      setRemix(data as AlgorithmView)
    }
  }, [data, setRemix])
  return <>{!isLoading && <CodeEditor />}</>
}

export default Create
