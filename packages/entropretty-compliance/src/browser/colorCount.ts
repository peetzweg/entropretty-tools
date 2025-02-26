/// <reference lib="dom" />

import type { SingleImageRule, ComplianceResult } from "./types"
import { defaultConfig } from "../config"

interface RGB {
  r: number
  g: number
  b: number
}

// Helper function to determine if colors are similar
function areSimilarColors(
  color1: RGB,
  color2: RGB,
  tolerance: number,
): boolean {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  )
}

export const colorCountRule: SingleImageRule = {
  name: "color-count",
  description: "Checks if the image uses more than 3 distinct colors",
  type: "single",
  check: async (buffer: ArrayBuffer): Promise<ComplianceResult> => {
    try {
      const config = defaultConfig.rules.colorCount
      // Create ImageData directly from the ArrayBuffer
      const data = new Uint8ClampedArray(buffer)

      // Store unique colors with tolerance grouping
      const colorGroups: RGB[] = []

      // Process pixels in groups of 4 (RGBA)
      for (let i = 0; i < data.length; i += 4) {
        const currentColor: RGB = {
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
        }

        // Check if this color is similar to any existing group
        let foundGroup = false
        for (const groupColor of colorGroups) {
          if (areSimilarColors(currentColor, groupColor, config.tolerance)) {
            foundGroup = true
            break
          }
        }

        // If no similar color group found, create new group
        if (!foundGroup) {
          colorGroups.push(currentColor)
        }
      }

      const colorCount = colorGroups.length
      const status = colorCount <= config.maxColors ? "pass" : "warn"

      return {
        status,
        metadata: [
          {
            message:
              status === "pass"
                ? `Image uses ${colorCount} distinct colors, which is within the limit of ${config.maxColors}`
                : `Image uses ${colorCount} distinct colors, which exceeds the recommended limit of ${config.maxColors}`,
            details: {
              totalColors: colorCount,
              uniqueColors: colorGroups.map((color) => ({
                r: color.r,
                g: color.g,
                b: color.b,
                hex: `#${color.r.toString(16).padStart(2, "0")}${color.g
                  .toString(16)
                  .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`,
              })),
              tolerance: config.tolerance,
              maxColors: config.maxColors,
            },
          },
        ],
        type: "colorCount",
      }
    } catch (error: unknown) {
      return {
        status: "error",
        metadata: [
          {
            message: `Failed to analyze color count: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          },
        ],
        type: "colorCount",
      }
    }
  },
}
