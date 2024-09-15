import fs from "node:fs/promises"
import puppeteer, { Browser, Page } from "puppeteer"

export type SchemaDrawerInitOptions = {
  size: number
}
export abstract class SchemaDrawer {
  abstract init(
    scriptFilePath: string,
    options: SchemaDrawerInitOptions,
  ): Promise<void>
  abstract deinit(): Promise<void>
  abstract draw(seed: Uint8Array): Promise<string>
}

export class PuppeteerSchemaDrawer extends SchemaDrawer {
  private _browser: Browser | null = null
  private _page: Page | null = null
  constructor() {
    super()
  }

  async draw(seed: Uint8Array): Promise<string> {
    if (!this._page) {
      throw new Error("PuppeteerSchemaDrawer not initialized")
    }

    return await this._page.evaluate(
      (seed) => {
        console.log("drawing seed in browser", seed.join(", "))
        if (typeof window.drawSeed === "function") {
          window.drawSeed(seed)
          return window.canvasAsBase64png()
        } else {
          console.error("drawOnCanvas function not defined")
        }
      },
      [...seed],
    )
  }

  async init(
    scriptFilePath: string,
    { size }: SchemaDrawerInitOptions,
  ): Promise<void> {
    const browser = await puppeteer.launch({ devtools: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 500, height: 500 })

    page.on("console", (message) =>
      console.log(
        `Browser Console: ${message.type().padEnd(9)}: ${message.text()}`,
      ),
    )
    page.on("pageerror", (error) =>
      console.log(`Browser Page Error: ${error.toString()}`),
    )

    const scriptContent = await fs.readFile(scriptFilePath, "utf8")
    const scriptDataUrl = `data:text/javascript;base64,${Buffer.from(scriptContent).toString("base64")}`

    await page.setContent(`
        <html>
          <body>
            <canvas id="canvas" width="${size}" height="${size}"></canvas>
            <script type="module">
              import { schema } from '${scriptDataUrl}';

              console.log('Module loaded. Schema:', schema);
              if (typeof schema === 'undefined') {
                console.error('Schema is not defined. Available global variables:', Object.keys(window));
              }

              const canvas = document.getElementById("canvas");

              window.drawSeed = (seed) => {
                const ctx = canvas.getContext('2d');
                ctx.save();

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.scale(canvas.width / 100, canvas.width / 100)
                ctx.lineWidth = 1
                ctx.lineCap = "butt"
                ctx.lineJoin = "miter"
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
                ctx.textAlign = "center"
                ctx.textBaseline = "bottom"

                schema.draw(ctx, seed);
                ctx.restore();
              };

              window.canvasAsBase64png = () => {
                return canvas.toDataURL('image/png').split(",")[1];
              }
            </script>
            </script>
          </body>
        </html>
      `)

    this._browser = browser
    this._page = page
  }

  async deinit(): Promise<void> {
    if (this._browser) {
      await this._browser.close()
    }
  }
}
