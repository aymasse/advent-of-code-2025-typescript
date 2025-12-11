import { resolve } from "node:path";
import { getReadLineInterface } from "../shared/utils.ts";
import {
  computeNextPosition,
  DIAL_SIZE,
  DIAL_START_VALUE,
  extractNumberFromDialCommand,
  INPUT_FILE_NAME,
  TIME_ID,
} from "./shared.ts";
import type { DialCommand } from "./types.ts";

async function main() {
  console.time(TIME_ID);
  let currentPosition = DIAL_START_VALUE;
  let numberOfZeroes = 0;

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  for await (const command of readLineInterface) {
    const movement = extractNumberFromDialCommand(command as DialCommand);
    const absoluteNextPosition = currentPosition + movement;
    const nextPosition = computeNextPosition(currentPosition, movement);

    const numberOfTimesWePassZero = computeNumberOfTimesWePassZero(
      currentPosition,
      absoluteNextPosition
    );

    numberOfZeroes += numberOfTimesWePassZero;
    currentPosition = nextPosition;
  }

  console.log(`Password: ${numberOfZeroes}`);
  console.timeEnd(TIME_ID);
}

function computeNumberOfTimesWePassZero(
  currentPosition: number,
  absoluteNextPosition: number
): number {
  if (absoluteNextPosition >= DIAL_SIZE) {
    return Math.floor(absoluteNextPosition / DIAL_SIZE);
  } else if (absoluteNextPosition < 0) {
    return (
      Math.abs(Math.ceil(absoluteNextPosition / 100)) +
      (currentPosition === 0 ? 0 : 1)
    );
  } else if (absoluteNextPosition === 0) {
    return 1;
  }

  return 0;
}

await main();
