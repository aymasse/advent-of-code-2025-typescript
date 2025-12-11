import { resolve } from "node:path";
import { getReadLineInterface } from "../shared/utils.ts";
import {
  PaperRollStorage,
  INPUT_FILE_NAME,
  populateGridRow,
  TIME_ID,
} from "./shared.ts";

async function main() {
  console.time(TIME_ID);

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  let grid: PaperRollStorage;
  let index = 0;

  for await (const line of readLineInterface) {
    grid ??= new PaperRollStorage(line.length);

    populateGridRow(line, index, grid);
    index++;
  }

  const accessiblePaperRolls = grid!.getAccessiblePaperRolls();

  console.log(`Result: ${accessiblePaperRolls.length}`);
  console.timeEnd(TIME_ID);
}

await main();
