import { resolve } from "node:path";
import { getReadLineInterface } from "../shared/utils.ts";
import {
  computeNextPosition,
  DIAL_START_VALUE,
  extractNumberFromDialCommand,
  INPUT_FILE_NAME,
  TIME_ID,
  type DialCommand,
} from "./shared.ts";

async function main() {
  console.time(TIME_ID);
  let currentPosition = DIAL_START_VALUE;
  let numberOfZeroes = 0;

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  for await (const command of readLineInterface) {
    const movement = extractNumberFromDialCommand(command as DialCommand);
    const nextPosition = computeNextPosition(currentPosition, movement);

    if (nextPosition === 0) {
      numberOfZeroes++;
    }

    currentPosition = nextPosition;
  }

  console.log(`Password: ${numberOfZeroes}`);
  console.timeEnd(TIME_ID);
}

await main();
