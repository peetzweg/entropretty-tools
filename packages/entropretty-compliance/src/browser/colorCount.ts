/// <reference lib="dom" />

import type { SingleImageRule, ComplianceResult } from "./types";

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Helper function to convert ArrayBuffer to ImageData
async function arrayBufferToImageData(buffer: ArrayBuffer): Promise<ImageData> {
  // Create a blob from the buffer
  const blob = new Blob([buffer], { type: "image/png" });
  // Create an image element
  const img = new Image();
  // Convert blob to data URL
  const url = URL.createObjectURL(blob);

  // Wait for image to load
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  // Create canvas and get context
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;

  // Draw image and get image data
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Cleanup
  URL.revokeObjectURL(url);

  return imageData;
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
  check: async (buffer: ArrayBuffer): Promise<ComplianceResult> => {
    try {
      const imageData = await arrayBufferToImageData(buffer);
      const config = (window as any).getConfig().rules.colorCount;
      const data = imageData.data;

      // Store unique colors with tolerance grouping
      const colorGroups: RGB[] = [];

      // Process pixels in groups of 4 (RGBA)
      for (let i = 0; i < data.length; i += 4) {
        const currentColor: RGB = {
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
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
