import Editor, { useMonaco } from "@monaco-editor/react"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { editorCodeAtom, remixAtom } from "./atoms"
import initialCode from "./initialCode"
import poimandresTheme from "./PoimandresTheme"

interface MonacoEditorProps {
  defaultValue: string
  value: string
  onChange: (value: string | undefined) => void
}

const MonacoEditor = ({ defaultValue, value, onChange }: MonacoEditorProps) => {
  const monaco = useMonaco()
  const [, setEditorCode] = useAtom(editorCodeAtom)
  const [remix] = useAtom(remixAtom)

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
    if (remix?.content || initialCode) {
      setEditorCode(remix?.content || initialCode)
    }
  }, [setEditorCode, remix])

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={defaultValue}
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
