import { resolve } from "node:path";
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export function getReadLineInterface(inputFileName: string) {
  const inputPath = resolve(`${inputFileName}`);
  const fileStream = createReadStream(inputPath);

  return createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}
