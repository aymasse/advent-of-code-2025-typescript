import { getReadLineInterface } from "../utils.ts";
import {
  computeNextPosition,
  DIAL_START_VALUE,
  extractNumberFromDialCommand,
  INPUT_FILE_NAME,
} from "./shared.ts";
import type { DialCommand } from "./types.ts";

const TIME_ID = "main";

async function main() {
  console.time(TIME_ID);
  let currentPosition = DIAL_START_VALUE;
  let numberOfZeroes = 0;

  const readLineInterface = getReadLineInterface(INPUT_FILE_NAME);

  for await (const command of readLineInterface) {
    const movement = extractNumberFromDialCommand(command as DialCommand);
    const nextPosition = computeNextPosition(
      currentPosition,
      movement
    );

    if (nextPosition === 0) {
      numberOfZeroes++;
    }

    currentPosition = nextPosition;
  }

  console.log(`Password: ${numberOfZeroes}`);
  console.timeEnd(TIME_ID);
}

await main();
