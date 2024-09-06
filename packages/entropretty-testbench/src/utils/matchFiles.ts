export function matchFiles(files: string[]): [string, string][] {
  return files.flatMap((file1, index) =>
    files.slice(index + 1).map((file2) => [file1, file2] as [string, string])
  );
}
