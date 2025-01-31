import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useAtom } from "jotai"
import { Suspense, lazy } from "react"
import { editorCodeAtom, remixAtom, scriptErrorAtom } from "./atoms"
import { CreateActions } from "./CreateActions"

import CodeEditorPreview from "./CodeEditorPreview"
import initialCode from "./initialCode"
import { SeedTool } from "./SeedTool"

const MonacoEditor = lazy(() => import("./MonacoEditor"))

const CodeEditor = () => {
  const [editorCode, setEditorCode] = useAtom(editorCodeAtom)
  const [scriptError] = useAtom(scriptErrorAtom)
  const [remix] = useAtom(remixAtom)

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
                  <SeedTool />
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
