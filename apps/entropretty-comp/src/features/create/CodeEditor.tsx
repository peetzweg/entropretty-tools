import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useAtom } from "jotai"
import { Suspense, lazy } from "react"
import { editorCodeAtom, remixAtom, scriptErrorAtom } from "./atoms"
import { CreateActions } from "./CreateActions"

import { EditorPreview } from "./EditorPreview"
import initialCode from "./initialCode"
import { SeedTool } from "./SeedTool"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
                <EditorPreview />
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
          className="flex h-full flex-col"
        >
          <Tabs defaultValue="code" className="flex h-full flex-col">
            <div className="flex-none border-b p-2">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="seed">Seed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="code" className="flex-1 overflow-hidden">
              <Suspense
                fallback={<div className="p-8">Loading Monaco editor...</div>}
              >
                <MonacoEditor
                  defaultValue={remix?.content || initialCode}
                  onChange={handleEditorChange}
                  value={editorCode}
                />
              </Suspense>
            </TabsContent>

            <TabsContent value="seed">
              <SeedTool />
            </TabsContent>
          </Tabs>

          {/* <CreateActions /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default CodeEditor
