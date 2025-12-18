import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export function getReadLineInterface(inputPath: string) {
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

export function product(nums: number[]): number {
  return nums.reduce((previous, current) => {
    return previous * current;
  }, 1);
}

export function getStringChunks(input: string, chunkSize: number): string[] {
  const numChunks = Math.ceil(input.length / chunkSize);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += chunkSize) {
    chunks[i] = input.substring(o, o + chunkSize);
  }

  return chunks;
}

export function getStringFirstHalf(str: string): string {
  if (!isEven(str.length)) {
    throw new Error("String length is not even. Cannot get half.");
  }

  return str.substring(0, str.length / 2);
}

export function getStringSecondHalf(str: string): string {
  if (!isEven(str.length)) {
    throw new Error("String length is not even. Cannot get half.");
  }

  return str.substring(str.length / 2);
}

export function areAllArrayElementsEqual(arr: unknown[]): boolean {
  return arr.every((element) => element === arr.at(0));
}

/**
 * Check if a is divisible by b, i.e., the remainder of their division is 0
 */
export function isDivisibleBy(a: number, b: number): boolean {
  return a % b === 0;
}

/**
 * Get the max number from a string containing digits
 */
export function getMaxFromString(str: string): number {
  return Math.max(...stringToNumbersArray(str));
}

export function stringToNumbersArray(str: string): number[] {
  return getStringChunks(str, 1).map((char) => parseInt(char, 10));
}

export function getStringWords(str: string): string[] {
  return str.split(/\s+/);
}

export async function printResults(
  part1: () => Promise<unknown>,
  part2: () => Promise<unknown>,
): Promise<void> {
  await printResult(part1, "PART1");
  await printResult(part2, "PART2");
}

async function printResult(
  part: () => Promise<unknown>,
  timeId: string,
): Promise<void> {
  console.time(timeId);
  const result = await part();
  console.log(`${timeId} result:`, result);
  console.timeEnd(timeId);
}
