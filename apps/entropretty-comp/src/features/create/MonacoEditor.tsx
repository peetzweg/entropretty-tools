import Editor, { useMonaco } from "@monaco-editor/react"
import { useAtom } from "jotai"
import { useCallback, useEffect } from "react"
import { editorCodeAtom } from "./atoms"
import initialCode from "./initialCode"

const MonacoEditor = () => {
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

  const onChange = (value: string | undefined) => {
    if (!value) return
    setEditorCode(value)
  }

  const onMount = useCallback(() => {
    if (!code) {
      console.log("setting initial code as no code", code)
      setEditorCode(initialCode)
    }
  }, [code, setEditorCode])

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="poimandres"
      defaultValue={initialCode}
      onChange={onChange}
      onMount={onMount}
      value={code}
      options={{
        minimap: { enabled: false },
        lineNumbers: "on",
        fontSize: 12,
      }}
    />
  )
}

export default MonacoEditor
