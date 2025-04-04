import { supabase } from "@/lib/supabase"
import { useQuery } from "@tanstack/react-query"
import { FamilyKind } from "entropretty-utils"
import { useAtom, useSetAtom } from "jotai"
import { Suspense, lazy, useEffect, useState } from "react"
import {
  editorCodeAtom,
  editorSeedTypeAtom,
  generateNewSeedAtom,
  remixAtom,
} from "../features/create/atoms"
import { AlgorithmView } from "../lib/helper.types"

const CreateFeature = lazy(() => import("../features/create"))

function Create({ remixId, seedType }: { remixId?: string, seedType?: FamilyKind }) {
  const [, setRemix] = useAtom(remixAtom)
  const [, setSeedType] = useAtom(editorSeedTypeAtom)
  const [, setEditorCode] = useAtom(editorCodeAtom)
  const [isReady, setIsReady] = useState<boolean>(false)
  const generateNewSeed = useSetAtom(generateNewSeedAtom)

  const { data, isLoading } = useQuery({
    queryKey: ["algorithm", remixId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("algorithms_with_user_profile")
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
      setEditorCode("")
      setSeedType(seedType || "Procedural")
      generateNewSeed()
      setRemix(null)
    } else {
      setRemix(data as AlgorithmView)

      setEditorCode(data.content || "")
      setSeedType(data.family_kind || "Procedural")
      generateNewSeed()
    }
    setTimeout(() => setIsReady(true), 500)
  }, [
    data,
    setRemix,
    seedType,
    setSeedType,
    generateNewSeed,
    setEditorCode,
  ])

  return (
    <>
      {!isLoading && isReady && (
        <Suspense fallback={<div className="p-8">Loading code editor...</div>}>
          <CreateFeature />
        </Suspense>
      )}
    </>
  )
}

export default Create
