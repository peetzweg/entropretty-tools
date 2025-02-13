import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { useAtom, useSetAtom } from "jotai"
import { Suspense, lazy, useEffect } from "react"
import { useSearchParams } from "react-router"
import {
  editorCodeAtom,
  editorSeedTypeAtom,
  generateNewSeedAtom,
  remixAtom,
} from "../features/create/atoms"
import { AlgorithmView } from "../lib/helper.types"

const CodeEditor = lazy(() => import("../features/create/CodeEditor"))

function Create() {
  const [searchParams] = useSearchParams()
  const remixId = searchParams.get("remix")
  const [, setRemix] = useAtom(remixAtom)
  const [, setSeedType] = useAtom(editorSeedTypeAtom)
  const [, setEditorCode] = useAtom(editorCodeAtom)
  const generateNewSeed = useSetAtom(generateNewSeedAtom)
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
      setEditorCode("")
    } else {
      setRemix(data as AlgorithmView)
      setEditorCode(data.content || "")
      setSeedType(data.family_kind || "Procedural")
      generateNewSeed()
    }
  }, [data, setRemix, setSeedType, generateNewSeed, setEditorCode])

  return (
    <>
      {!isLoading && (
        <Suspense fallback={<div className="p-8">Loading code editor...</div>}>
          <CodeEditor />
        </Suspense>
      )}
    </>
  )
}

export default Create
