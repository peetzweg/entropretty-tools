#!/usr/bin/env node
import cac from "cac";
import dev from "@/features/dev";

const cli = cac("entropretty");

cli.command("dev", "start entropretty editor in dev mode").action(async () => {
  await dev();
});

cli
  // Simply omit the command name, just brackets
  .command("[...args]", "Build files")
  .action(() => {
    cli.outputHelp();
  });

cli.help();

try {
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
} catch (error) {
  if (error instanceof Error) console.error(error.message);
  else {
    console.error(error);
  }

  process.exit(1);
}
