import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { useAtom, useSetAtom } from "jotai"
import { Suspense, lazy } from "react"
import {
  editorCodeAtom,
  editorSeedAtom,
  generateNewSeedAtom,
  remixAtom,
  scriptErrorAtom,
} from "./atoms"
import { CreateActions } from "./CreateActions"

import { seedToKey } from "entropretty-utils"
import { DicesIcon } from "lucide-react"
import CodeEditorPreview from "./CodeEditorPreview"
import initialCode from "./initialCode"

const MonacoEditor = lazy(() => import("./MonacoEditor"))

const CodeEditor = () => {
  const [editorCode, setEditorCode] = useAtom(editorCodeAtom)
  const [scriptError] = useAtom(scriptErrorAtom)
  const [remix] = useAtom(remixAtom)
  const generateNewSeed = useSetAtom(generateNewSeedAtom)
  const [seed] = useAtom(editorSeedAtom)

  const handleEditorChange = async (value: string | undefined) => {
    if (!value) return
    setEditorCode(value)
  }

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen w-screen"
        autoSave="editor-layout"
        autoSaveId="editor-layout-id"
      >
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={90} className="h-full w-full">
              <div className="relative h-full w-full">
                <CodeEditorPreview />
                <div className="absolute bottom-2 right-2">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div>{seedToKey(new Uint8Array(seed))}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={generateNewSeed}
                    >
                      <DicesIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />
            <ResizablePanel defaultSize={10}>
              <div className="text-destructive h-full w-full whitespace-pre-wrap bg-gray-800/10 p-1">
                {scriptError || null}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel
          defaultSize={50}
          minSize={10}
          className="relative flex flex-col"
        >
          <div className="flex-grow-1 flex w-full flex-row gap-0">
            <div className="bg-yellow-400 p-2">Procedural</div>
            <div className="bg-blue-400 p-2">ProceduralAccount</div>
            <div className="bg-red-400 p-2">ProceduralPersonal</div>
          </div>
          <Suspense
            fallback={<div className="p-8">Loading Monaco editor...</div>}
          >
            <MonacoEditor
              defaultValue={remix?.content || initialCode}
              onChange={handleEditorChange}
              value={editorCode}
            />
          </Suspense>
          <CreateActions />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default CodeEditor
