import cac from "cac";
import { magick } from "./src/features/magick";
import { sample } from "./src/features/sample";
import { matchFiles } from "./src/utils/matchFiles";
import { $ } from "bun";
const cli = cac("tattoo");

cli
  .command("magick [...images]", "List all TODOs in the codebase")
  // TODO pass in threshold
  //   .option("--threshold [threshold]", "threshold of similarity")
  .action(async (images: string[], options) => {
    const matchedImages = matchFiles(images);
    const combinations = matchedImages.length;
    let progress = 0;

    console.log(
      images.length,
      "Files",
      "Checking",
      combinations,
      "combinations"
    );
    let lowestAE = Infinity;
    let mostSimilar = undefined;

    for (const [imageA, imageB] of matchedImages) {
      const result = await magick(imageA, imageB);

      const AE = parseInt(result.AE);
      if (AE < lowestAE) {
        lowestAE = AE;
        mostSimilar = { imageA, imageB, result };
      }
      // TODO abort if "collision" is found
      progress++;
      const percentage = (progress / combinations) * 100;
      if (percentage !== 0 && percentage % 10 === 0)
        console.log("Progress", percentage, "%");
    }

    console.log({ mostSimilar });
  });

cli
  .command("sample <script>", "Create a random set of images from a script")
  .option("--size [size]", "width and height of the canvas, default 200")
  .option("--amount [amount]", "amount of images to sample, default 50")
  .action(async (script, options) => {
    console.log({ options });
    await sample(script, options);
  });

cli
  .command("pixel <...images>", "Create a random set of images from a script")
  .action(async (images, options) => {
    console.log({ options });
    for (const image of images) {
      console.log({ image });
      await $`magick convert -resize 10% -filter Point ${image} ./out/$(basename ${image})`;
    }
  });

cli.help();

try {
  // Parse CLI args without running the command
  cli.parse(process.argv, { run: false });
  // Run the command yourself
  // You only need `await` when your command action returns a Promise
  await cli.runMatchedCommand();
  process.exit(0);
} catch (error) {
  if (error instanceof Error) console.error(error.message);
  else {
    console.error(error);
  }

  process.exit(1);
}
