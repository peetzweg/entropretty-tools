import { expose } from "comlink"
import { preludeScript } from "./prelude"
import {
  colorCountRule,
  colorIslandsRule,
} from "entropretty-compliance/browser"
import type {
  SingleImageRule,
  ComplianceResult as RuleComplianceResult,
  CheckMetadata,
} from "entropretty-compliance/browser"

const COMPLIANCE_TIMEOUT_MS = 300
const COMPLIANCE_REFERENCE_SIZE = 100

type Size = number
export type AlgorithmId = number
type ComplianceJob = {
  algorithmId: AlgorithmId
  size: Size
  seed: number[]
  resolve: (result: ComplianceResult) => void
  reject: (error: Error) => void
}

export interface ComplianceResult {
  isCompliant: boolean
  issues: CheckMetadata[]
}

// Centralized registry of all compliance rules
const complianceRules: SingleImageRule[] = [
  colorCountRule,
  colorIslandsRule,
  // Add new rules here
]

const algorithms: Map<AlgorithmId, string> = new Map()
const complianceQueue: ComplianceJob[] = []
let isProcessing = false

const workerAPI = {
  async updateAlgorithm(algorithmId: AlgorithmId, algorithm: string) {
    if (algorithmId === 0) {
      algorithms.set(algorithmId, algorithm)
    } else {
      if (!algorithms.has(algorithmId)) {
        algorithms.set(algorithmId, algorithm)
        console.info("Updated compliance algo", algorithmId)
      }
    }
  },

  async checkCompliance(
    algorithmId: AlgorithmId,
    size: Size,
    seed: number[],
  ): Promise<ComplianceResult> {
    return new Promise((resolve, reject) => {
      const seedCopy = [...seed]
      const job: ComplianceJob = {
        algorithmId,
        size,
        seed: seedCopy,
        resolve,
        reject,
      }
      complianceQueue.push(job)
      processQueue()
    })
  },

  cancelCheck(algorithmId: AlgorithmId, size: Size, seed: number[]) {
    const index = complianceQueue.findIndex(
      (job) =>
        job.algorithmId === algorithmId &&
        job.size === size &&
        compareNumberArrays(job.seed, seed),
    )

    if (index !== -1) {
      complianceQueue[index].reject(new Error("Compliance check cancelled"))
      complianceQueue.splice(index, 1)
    }
  },
}

async function processQueue() {
  if (isProcessing || complianceQueue.length === 0) return

  isProcessing = true
  const { algorithmId, size, seed, resolve, reject } = complianceQueue.shift()!

  if (!algorithms.has(algorithmId)) {
    reject(new Error(`No script found for ${algorithmId}`))
    isProcessing = false
    processQueue()
    return
  }

  const script = algorithms.get(algorithmId)!
  const canvas = new OffscreenCanvas(
    COMPLIANCE_REFERENCE_SIZE,
    COMPLIANCE_REFERENCE_SIZE,
  )
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    reject(new Error("Failed to get 2D rendering context"))
    isProcessing = false
    processQueue()
    return
  }

  try {
    const timeoutPromise = new Promise((_, timeoutReject) => {
      setTimeout(() => {
        timeoutReject(
          new Error(
            `Compliance check timed out after ${COMPLIANCE_TIMEOUT_MS}ms`,
          ),
        )
      }, COMPLIANCE_TIMEOUT_MS)
    })

    const checkPromise = (async () => {
      ctx.scale(canvas.width / 100, canvas.width / 100)
      ctx.lineWidth = 1
      ctx.lineCap = "butt"
      ctx.lineJoin = "miter"
      ctx.strokeStyle = "black"
      ctx.fillStyle = "black"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      // Execute the algorithm to check for compliance
      const drawAlgorithm = new Function(
        "ctx",
        "seed",
        `${preludeScript}\n${script}`,
      )

      // Draw the algorithm first
      drawAlgorithm(ctx, seed)

      console.log("drawAlgorithm")

      // Get the raw pixel data directly from the original canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Create a proper ArrayBuffer from the data
      const buffer = new ArrayBuffer(imageData.data.length)
      new Uint8Array(buffer).set(imageData.data)

      // Run all compliance rules
      const ruleResults = await runAllComplianceRules(buffer)

      // Extract all issues from rule results
      const issues: CheckMetadata[] = []
      let isCompliant = true

      for (const result of ruleResults) {
        if (result.status !== "pass" && result.metadata) {
          issues.push(...result.metadata)
          isCompliant = false
        }
      }

      return {
        isCompliant,
        issues,
      }
    })()

    const result = (await Promise.race([
      checkPromise,
      timeoutPromise,
    ])) as ComplianceResult

    resolve(result)
  } catch (error) {
    console.error(error)
    reject(error as Error)
  }

  isProcessing = false
  processQueue()
}

/**
 * Runs all compliance rules on the given image buffer
 * @param buffer The image buffer to check
 * @returns Array of compliance results from all rules
 */
async function runAllComplianceRules(
  buffer: ArrayBuffer,
): Promise<RuleComplianceResult[]> {
  return Promise.all(complianceRules.map((rule) => rule.check(buffer)))
}

function compareNumberArrays(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false
  return a.every((val, i) => val === b[i])
}

export type ComplianceWorker = typeof workerAPI
expose(workerAPI)
