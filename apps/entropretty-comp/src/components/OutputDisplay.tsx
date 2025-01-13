import dynamic from "next/dynamic"

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
)

interface OutputDisplayProps {
  output: string
  error: string | null
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, error }) => {
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Output:</h2>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <CodeEditor
          value={output}
          language="js"
          placeholder="Code execution output..."
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#f5f5f5",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
          readOnly
        />
      )}
    </div>
  )
}

export default OutputDisplay
