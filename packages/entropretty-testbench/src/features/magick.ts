import { $, ShellPromise } from "bun";

const resolveToString = async (command: ShellPromise): Promise<string> => {
  const { stdout } = await command.nothrow().quiet();
  return stdout.toString();
};

type CompareType = "AE" | "MAE" | "MSE" | "RSME";

const calls: Record<CompareType, (a: string, b: string) => Promise<string>> = {
  AE: (a, b) => resolveToString($`compare -metric AE ${a} ${b} NULL: 2>&1`),
  MAE: (a, b) => resolveToString($`compare -metric MAE ${a} ${b} NULL: 2>&1`),
  MSE: (a, b) => resolveToString($`compare -metric MSE ${a} ${b} NULL: 2>&1`),
  RSME: (a, b) => resolveToString($`compare -metric RMSE ${a} ${b} NULL: 2>&1`),
} as const;

export const magick = async (imageA: string, imageB: string) => {
  const results: Partial<Record<keyof typeof calls, string>> = {};
  const promises = Object.entries(calls).map(([label, call]) => {
    return call(imageA, imageB).then((result) => {
      results[label as CompareType] = result;
    });
  });

  await Promise.all(promises);

  return results as Record<CompareType, string>;
};
