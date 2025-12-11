import { resolve } from "node:path";
import { getReadLineInterface } from "../shared/utils.ts";
import {
  PaperRollStorage,
  INPUT_FILE_NAME,
  populateGridRow,
  TIME_ID,
  type Position,
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

  let numberOfRemovedPaperRolls = 0;
  let accessiblePaperRolls: Position[] = [];

  do {
    accessiblePaperRolls = grid!.getAccessiblePaperRolls();
    grid!.removePaperRolls(accessiblePaperRolls);
    numberOfRemovedPaperRolls += accessiblePaperRolls.length;
  } while (accessiblePaperRolls.length > 0);

  console.log(`Result: ${numberOfRemovedPaperRolls}`);
  console.timeEnd(TIME_ID);
}

await main();
