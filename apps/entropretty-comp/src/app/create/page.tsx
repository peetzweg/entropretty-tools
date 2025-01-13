"use client"
import dynamic from "next/dynamic"
const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        TypeScript/JavaScript Code Evaluator
      </h1>
      <CodeEditor />
    </main>
  )
}
