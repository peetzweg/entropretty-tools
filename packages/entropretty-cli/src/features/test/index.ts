import fs from "node:fs/promises"
import path, { basename } from "node:path"
import pc from "picocolors"
import puppeteer from "puppeteer"

export default async function run(scriptPath: string) {
  const __cwd = process.cwd()

  const testFolder = path.join(
    __cwd,
    ".entropretty",
    "test",
    basename(scriptPath, ".js"),
  )
  // await fs.rm(testFolder, { recursive: true, force: true })
  // await fs.mkdir(testFolder)

  console.log(pc.cyan(`under test '${scriptPath}'`))
  try {
    const startTime = Date.now()
    // Launch the browser
    const browser = await puppeteer.launch({ devtools: false })
    // Create a new page
    const page = await browser.newPage()
    // Set viewport size
    await page.setViewport({ width: 500, height: 500 })

    page.on("console", (message) =>
      console.log(
        `Browser Console: ${message.type().padEnd(9)}: ${message.text()}`,
      ),
    )
    page.on("pageerror", (error) =>
      console.log(`Browser Page Error: ${error.toString()}`),
    )

    const scriptContent = await fs.readFile(scriptPath, "utf8")
    // Create a data URL for the script content
    const scriptDataUrl = `data:text/javascript;base64,${Buffer.from(scriptContent).toString("base64")}`

    // Inject HTML with a canvas element and a script tag for the module
    await page.setContent(`
    <html>
      <body>
        <canvas id="myCanvas" width="500" height="500"></canvas>
        <script type="module">
          import { schema } from '${scriptDataUrl}';

          console.log('Module loaded. Schema:', schema);


          if (typeof schema === 'undefined') {
            console.error('Schema is not defined. Available global variables:', Object.keys(window));
          }

          // Access the exported schema and call the draw function
          window.drawOnCanvas = (canvasId) => {
            const canvas = document.getElementById(canvasId);

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.scale(canvas.width / 100, canvas.width / 100)
            ctx.lineWidth = 1
            ctx.lineCap = "butt"
            ctx.lineJoin = "miter"
            ctx.strokeStyle = "black"
            ctx.fillStyle = "black"
            ctx.textAlign = "center"
            ctx.textBaseline = "bottom"
            schema.draw(ctx, new Uint8Array([123,0,1,2]));
          };
          console.log('drawOnCanvas function defined:', typeof window.drawOnCanvas);
        </script>
        </script>
      </body>
    </html>
  `)

    // Execute the drawing function
    await page.evaluate(() => {
      window.drawOnCanvas("myCanvas")
      // if (typeof window.drawOnCanvas === "function") {
      // } else {
      //   console.error("drawOnCanvas function not found")
      // }
    })

    // Get the canvas content as a base64-encoded PNG
    const pngData = await page.evaluate(() => {
      const canvas = document.getElementById("myCanvas") as HTMLCanvasElement
      console.log({ canvas })
      return canvas.toDataURL("image/png").split(",")[1]
    })

    // Save the PNG file
    await fs.writeFile("output.png", Buffer.from(pngData, "base64"))

    // Close the browser
    await browser.close()

    console.log("Canvas content saved as output.png")

    const endTime = Date.now()
    const time = endTime - startTime
    console.log(pc.green(`test completed in ${time}ms\n`))
  } catch (e) {
    console.error(pc.red(`failed to test ${scriptPath}`))
    console.error(e)
  }
}
