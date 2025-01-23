import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Editor, { useMonaco } from "@monaco-editor/react"
import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import {
  editorCodeAtom,
  editorSeedAtom,
  generateNewSeedAtom,
  remixAtom,
  scriptErrorAtom,
} from "./atoms"
import { CreateActions } from "./CreateActions"

import CodeEditorPreview from "./CodeEditorPreview"
import initialCode from "./initialCode"
import { Button } from "../../components/ui/button"
import { DicesIcon } from "lucide-react"
import { seedToKey } from "entropretty-utils"

const CodeEditor = () => {
  const [editorCode, setEditorCode] = useAtom(editorCodeAtom)
  const [scriptError] = useAtom(scriptErrorAtom)
  const [remix] = useAtom(remixAtom)
  const generateNewSeed = useSetAtom(generateNewSeedAtom)
  const [seed] = useAtom(editorSeedAtom)
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare const ctx: CanvasRenderingContext2D;
        declare const seed: number[];
        declare function bits(): void;
      `)
    }
    setEditorCode(remix?.content || initialCode)
  }, [monaco, setEditorCode, remix])

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
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={remix?.content || initialCode}
            onChange={handleEditorChange}
            value={editorCode}
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
