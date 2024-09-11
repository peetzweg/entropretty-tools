import { EntroprettyEditor, EntroprettyEditorWorker } from "entropretty-editor";

import Worker from "./worker?worker";
import { Remote, wrap } from "comlink";
import { useEffect, useState, useRef } from "react";
const worker = new Worker();

const wrappedWorker: Remote<EntroprettyEditorWorker> = wrap(worker);

function App() {
  return (
    <main>
      {false && <SchemaSelect />}
      <EntroprettyEditor worker={worker} />
    </main>
  );
}

const SchemaSelect = () => {
  const [schemas, setSchemas] = useState<string[]>([]);
  useEffect(() => {
    wrappedWorker.init().then((schemas: string[]) => {
      setSchemas(schemas.sort());
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {schemas.map((schema) => (
          <DrawingBitmap
            key={schema}
            schema={schema}
            size={100}
            seed={Uint8Array.from([1, 2, 3, 4])}
          />
        ))}
      </div>
    </div>
  );
};

interface Props {
  seed: Uint8Array;
  schema: string;
  size: number;
}

export const DrawingBitmap: React.FC<Props> = ({ seed, schema, size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    wrappedWorker.drawTransfer(schema, seed, size).then((bitmap) => {
      const context = canvasRef.current!.getContext("2d")!;
      context.clearRect(0, 0, size, size);
      context.drawImage(bitmap, 0, 0, size, size);
    });
  }, [seed, schema, size]);

  return (
    <>
      <canvas
        title={seed.join(",")}
        ref={canvasRef}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    </>
  );
};

export default App;
