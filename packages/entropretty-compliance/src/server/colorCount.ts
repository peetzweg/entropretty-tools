import type { SingleImageRule, ComplianceResult } from "../types";
import sharp from "sharp";
import { getConfig } from "../config";

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Helper function to determine if colors are similar
function areSimilarColors(
  color1: RGB,
  color2: RGB,
  tolerance: number
): boolean {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
}

export const colorCountRule: SingleImageRule = {
  name: "color-count",
  description: "Checks if the image uses more than 3 distinct colors",
  type: "single",
  check: async (imageBuffer: Buffer): Promise<ComplianceResult> => {
    try {
      const config = getConfig().rules.colorCount;
      const image = sharp(imageBuffer);
      const { channels } = await image.metadata();
      const rawData = await image.raw().toBuffer();

      // Store unique colors with tolerance grouping
      const colorGroups: RGB[] = [];

      // Process pixels in groups of channels (RGB or RGBA)
      for (let i = 0; i < rawData.length; i += channels!) {
        const currentColor: RGB = {
          r: rawData[i],
          g: rawData[i + 1],
          b: rawData[i + 2],
        };

        // Check if this color is similar to any existing group
        let foundGroup = false;
        for (const groupColor of colorGroups) {
          if (areSimilarColors(currentColor, groupColor, config.tolerance)) {
            foundGroup = true;
            break;
          }
        }

        // If no similar color group found, create new group
        if (!foundGroup) {
          colorGroups.push(currentColor);
        }
      }

      const colorCount = colorGroups.length;
      const status = colorCount <= config.maxColors ? "pass" : "warn";

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
      };
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
      };
    }
  },
};
