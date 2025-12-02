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

export async function getFirstLine(inputFileName: string): Promise<string> {
  const readLineInterface = getReadLineInterface(inputFileName);

  for await (const line of readLineInterface) {
    return line;
  }

  return "";
}

export function isEven(num: number): boolean {
  return num % 2 === 0;
}

export function sum(nums: number[]): number {
  return nums.reduce((previous, current) => {
    return previous + current;
  }, 0);
}

export function getStringChunks(input: string, chunkSize: number): string[] {
  const numChunks = Math.ceil(input.length / chunkSize)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += chunkSize) {
    chunks[i] = input.substring(o, o + chunkSize)
  }

  return chunks
}
