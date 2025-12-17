import { resolve } from "node:path";
import { getReadLineInterface, printResults } from "../shared/utils.ts";

type DialDirection = "L" | "R";
type DialDistance = number;
type DialCommand = `${DialDirection}${DialDistance}`;

const DIAL_SIZE = 100;
const DIAL_START_VALUE = 50;
const INPUT_FILE_NAME = "input.txt";

async function part1() {
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

  return numberOfZeroes;
}

async function part2() {
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
      absoluteNextPosition,
    );

    numberOfZeroes += numberOfTimesWePassZero;
    currentPosition = nextPosition;
  }

  return numberOfZeroes;
}

function computeNumberOfTimesWePassZero(
  currentPosition: number,
  absoluteNextPosition: number,
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

function computeNextPosition(
  currentPosition: number,
  movement: number,
): number {
  const simplifiedMovement = movement % DIAL_SIZE;

  return (DIAL_SIZE + currentPosition + simplifiedMovement) % DIAL_SIZE;
}

function extractNumberFromDialCommand(command: DialCommand): number {
  const direction = command.at(0) as DialDirection;
  const distance = parseInt(command.substring(1), 10) as DialDistance;

  return direction === "L" ? -distance : distance;
}

async function main() {
  await printResults(part1, part2);
}

await main();
