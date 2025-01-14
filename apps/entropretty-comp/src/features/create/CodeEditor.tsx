import Editor, { useMonaco } from "@monaco-editor/react"
import { useEffect, useRef, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import Worker from "@/lib/worker?worker"
import { Remote, wrap } from "comlink"
import { CompWorker } from "../../lib/createWorker"
import { DrawingBitmap } from "./DrawingBitmap"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import initialCode from "./initialCode"
import { CreateActions } from "./CreateActions"

const seed = new Uint8Array([1, 2, 3, 4])

const CodeEditor = () => {
  const [code, setCode] = useState<string | undefined>(initialCode)
  const [key, setKey] = useState<number>(new Date().getTime())
  const debouncedSetKey = useDebounceCallback(setKey, 500)

  const monaco = useMonaco()
  const workerRef = useRef<Remote<CompWorker> | null>(null)

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare const ctx: CanvasRenderingContext2D;
        declare const seed: number[];
        declare function bits(): void;
      `)
    }
  }, [monaco])

  useEffect(() => {
    const worker = new Worker()
    const wrappedWorker: Remote<CompWorker> = wrap(worker)
    workerRef.current = wrappedWorker
    workerRef.current
      .updateAlgorithm("editor", `console.log("Hello, World!")`)
      .then(() => {
        setKey(new Date().getTime())
      })

    return () => {
      workerRef.current = null
      worker.terminate()
    }
  }, [])

  const handleEditorChange = (value: string | undefined) => {
    setCode(value)
    if (!value) return
    workerRef.current?.updateAlgorithm("editor", value).then(() => {
      debouncedSetKey(new Date().getTime())
    })
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
          <div className="flex h-full flex-row flex-wrap">
            {workerRef.current && (
              <>
                <DrawingBitmap
                  key={key}
                  seed={seed}
                  algorithmId={"editor"}
                  size={480}
                  worker={workerRef.current}
                />
              </>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={10} className="flex flex-col">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              lineNumbers: "on",
              fontSize: 12,
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <CreateActions />
    </>
  )
}

export default CodeEditor
