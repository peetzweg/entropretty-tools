"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
})
import { Button } from "@/components/ui/button"
import { useCodeEvaluation } from "@/hooks/useCodeEvaluation"
import OutputDisplay from "./OutputDisplay"
import { useMonaco } from "@monaco-editor/react"

const CodeEditor = () => {
  const [code, setCode] = useState<string | undefined>(
    '// Type your code here\nconsole.log("Hello, World!");',
  )
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      // Add global variables to the Monaco language service
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare const ctx: CanvasRenderingContext2D;
        declare const seed: number[];
        declare function bits(): void;
      `)
    }
  }, [monaco])

  const { evaluateCode, output, error } = useCodeEvaluation()

  const handleEditorChange = (value: string | undefined) => {
    setCode(value)
  }

  const handleRunCode = () => {
    if (code) {
      evaluateCode(code)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <MonacoEditor
          height="400px"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            lineNumbers: "off",
            fontSize: 14,
          }}
        />
        <Button onClick={handleRunCode} className="mt-4">
          Run Code
        </Button>
      </div>
      <div>
        <OutputDisplay output={output} error={error} />
      </div>
    </div>
  )
}

export default CodeEditor
