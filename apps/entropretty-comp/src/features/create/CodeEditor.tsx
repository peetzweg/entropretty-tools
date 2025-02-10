import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useAtom } from "jotai"
import { Suspense, lazy } from "react"
import { editorCodeAtom, remixAtom, scriptErrorAtom } from "./atoms"
import { EditorPreview } from "./EditorPreview"
import initialCode from "./initialCode"
import { SeedTools } from "./SeedTools"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlgorithmNameInput } from "./AlgorithmNameInput"
import { PostButton } from "./PostButton"
import { Separator } from "@/components/ui/separator"
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

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={10}>
              <div className="text-destructive h-full w-full whitespace-pre-wrap bg-gray-800/10 p-1">
                {scriptError || null}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={50}
          minSize={10}
          className="flex h-full flex-col"
        >
          <Tabs defaultValue="code" className="flex h-full flex-col">
            <div className="flex flex-row items-center gap-4 border-b p-2">
              <div className="flex w-full flex-row items-center gap-2">
                <AlgorithmNameInput />
                <PostButton />
              </div>
              <Separator orientation="vertical" />
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="seed">Seed</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="code" className="flex-1">
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

            <TabsContent value="seed" className="flex-1 overflow-y-scroll">
              <SeedTools />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default CodeEditor
