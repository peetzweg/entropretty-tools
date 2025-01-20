import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Editor, { useMonaco } from "@monaco-editor/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { editorCodeAtom, remixAtom, scriptErrorAtom } from "./atoms"
import { CreateActions } from "./CreateActions"
import initialCode from "./initialCode"
import CodeEditorPreview from "./CodeEditorPreview"

const CodeEditor = () => {
  const [, setEditorCode] = useAtom(editorCodeAtom)
  const [scriptError] = useAtom(scriptErrorAtom)
  const [remix] = useAtom(remixAtom)

  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare const ctx: CanvasRenderingContext2D;
        declare const seed: number[];
        declare function bits(): void;
      `)
      setEditorCode(remix?.content || initialCode)
    }
  }, [monaco, setEditorCode, remix?.content])

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
            <ResizablePanel defaultSize={95}>
              <CodeEditorPreview />
            </ResizablePanel>

            <ResizableHandle />
            <ResizablePanel defaultSize={10}>
              <div className="text-destructive h-full w-full whitespace-pre-wrap p-1">
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
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={remix?.content || initialCode}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              lineNumbers: "on",
              fontSize: 12,
            }}
          />
          <CreateActions />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export default CodeEditor
