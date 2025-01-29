import Editor, { useMonaco } from "@monaco-editor/react"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { editorCodeAtom, remixAtom } from "./atoms"
import initialCode from "./initialCode"

interface MonacoEditorProps {
  defaultValue: string
  value: string
  onChange: (value: string | undefined) => void
}

const MonacoEditor = ({ defaultValue, value, onChange }: MonacoEditorProps) => {
  const monaco = useMonaco()
  const [, setEditorCode] = useAtom(editorCodeAtom)
  const [remix] = useAtom(remixAtom)

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

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue={defaultValue}
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
