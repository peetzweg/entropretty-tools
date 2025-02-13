import Editor, { useMonaco } from "@monaco-editor/react"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { editorCodeAtom } from "./atoms"
import initialCode from "./initialCode"

interface MonacoEditorProps {
  defaultValue: string
  value: string
  onChange: (value: string | undefined) => void
}

const MonacoEditor = ({ value, onChange }: MonacoEditorProps) => {
  const monaco = useMonaco()
  const [code, setEditorCode] = useAtom(editorCodeAtom)

  // Set up Monaco configuration
  useEffect(() => {
    if (monaco) {
      // Define theme first
      // monaco.editor.defineTheme("poimandres", poimandresTheme)
      // monaco.editor.setTheme("poimandres")

      // Then set up JavaScript environment
      monaco.languages.typescript.javascriptDefaults.addExtraLib(`
        declare const ctx: CanvasRenderingContext2D;
        declare const seed: number[];
        declare function bits(): void;
      `)
    }
  }, [monaco])

  // Handle code initialization
  useEffect(() => {
    if (!code) {
      setEditorCode(initialCode)
    }
  }, [setEditorCode, code])

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="poimandres"
      onChange={onChange}
      value={value}
      options={{
        minimap: { enabled: false },
        lineNumbers: "on",
        fontSize: 12,
      }}
    />
  )
}

export default MonacoEditor
