import { resolve } from "node:path";
import { getReadLineInterface, printResults } from "../shared/utils.ts";
import { PaperRollStorage, type Position } from "./PaperRollStorage.js";

const INPUT_FILE_NAME = "input.txt";
const PAPER_ROLL_PRESENCE_CHAR = "@";
const LIMIT_TO_BE_ACCESSIBLE = 4;

async function part1() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  let grid: PaperRollStorage;
  let index = 0;

  for await (const line of readLineInterface) {
    grid ??= new PaperRollStorage(line.length);

    populateGridRow(line, index, grid);
    index++;
  }

  const accessiblePaperRolls = grid!.getAccessiblePaperRolls(
    LIMIT_TO_BE_ACCESSIBLE,
  );

  return accessiblePaperRolls.length;
}

async function part2() {
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
    accessiblePaperRolls = grid!.getAccessiblePaperRolls(
      LIMIT_TO_BE_ACCESSIBLE,
    );
    grid!.removePaperRolls(accessiblePaperRolls);
    numberOfRemovedPaperRolls += accessiblePaperRolls.length;
  } while (accessiblePaperRolls.length > 0);

  return numberOfRemovedPaperRolls;
}

function populateGridRow(row: string, x: number, grid: PaperRollStorage) {
  for (let y = 0; y < row.length; y++) {
    grid.set({ x, y }, row[y] === PAPER_ROLL_PRESENCE_CHAR);
  }
}

async function main() {
  await printResults(part1, part2);
}

await main();
