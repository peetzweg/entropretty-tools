import { useState } from 'react'

export const useCodeEvaluation = () => {
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const evaluateCode = (code: string) => {
    setError(null)
    setOutput('')

    const originalConsoleLog = console.log
    const logs: string[] = []

    try {
      // Override console.log to capture output
      console.log = (...args) => {
        logs.push(args.map(arg => JSON.stringify(arg)).join(' '))
      }

      // Evaluate the code
      new Function(code)()

      // Restore original console.log
      console.log = originalConsoleLog

      setOutput(logs.join('\n'))
    } catch (err) {
      console.log = originalConsoleLog
      setError((err as Error).message)
    }
  }

  return { evaluateCode, output, error }
}

