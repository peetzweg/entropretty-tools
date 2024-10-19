import Editor from "@monaco-editor/react"
import { useDebounceCallback } from "usehooks-ts"
function Submit() {
  const evalCode = useDebounceCallback(
    (value) => {
      console.log("debounced: ", value)
    },
    1000,
    {
      leading: false,
    },
  )
  return (
    <main className="relative flex flex-row">
      <div className="h-full w-1/2 resize">
        <Editor
          height="100vh"
          theme="vs-dark"
          options={{
            minimap: {
              enabled: false,
            },
          }}
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onChange={(data) => evalCode(data)}
        />
      </div>
      <div className="resize-x">
        <h2>ViewPort</h2>
      </div>
    </main>
  )
}

export default Submit
