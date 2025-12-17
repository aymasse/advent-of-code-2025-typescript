import { resolve } from "node:path";
import {
  areAllArrayElementsEqual,
  getFirstLine,
  getStringChunks,
  getStringFirstHalf,
  getStringSecondHalf,
  isDivisibleBy,
  isEven,
  printResults,
  sum,
} from "../shared/utils.ts";

type IdsRange = `${number}-${number}`;
type Id = number;
type InvalidId = number;

interface IdsRangeDetails {
  start: Id;
  end: Id;
}

const INPUT_FILE_NAME = "input.txt";
const IDS_RANGES_LIST_SEPARATOR = ",";
const IDS_RANGE_SEPARATOR = "-";

async function part1() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const firstLine = await getFirstLine(inputPath);
  const idsRanges = extractIdsRanges(firstLine);

  const invalidIds = idsRanges.map(extractIdsRangeDetails).flatMap((range) => {
    return getInvalidIdsFromRange(range, isAPatternRepeatedTwice);
  });

  const totalInvalidIds = sum(invalidIds);

  return totalInvalidIds;
}

async function part2() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const firstLine = await getFirstLine(inputPath);
  const idsRanges = extractIdsRanges(firstLine);

  const invalidIds = idsRanges.map(extractIdsRangeDetails).flatMap((range) => {
    return getInvalidIdsFromRange(range, isAPatternRepeated);
  });

  const totalInvalidIds = sum(invalidIds);

  return totalInvalidIds;
}

function extractIdsRanges(line: string): IdsRange[] {
  return line.split(IDS_RANGES_LIST_SEPARATOR) as IdsRange[];
}

function extractIdsRangeDetails(range: IdsRange): IdsRangeDetails {
  const [start, end] = range.split(IDS_RANGE_SEPARATOR);

  return {
    start: parseInt(start, 10),
    end: parseInt(end, 10),
  };
}

function getInvalidIdsFromRange(
  range: IdsRangeDetails,
  iteratee: (id: Id) => boolean,
): InvalidId[] {
  const invalidIds: InvalidId[] = [];

  for (let id = range.start; id <= range.end; id++) {
    if (iteratee(id)) {
      invalidIds.push(id);
    }
  }

  return invalidIds;
}

/**
 * An invalid id has a form like this: XYZXYZ
 * It MUST be a string with a pattern repeated once
 * Therefore, only strings with an even length can be invalid ids
 * We only need to check if the first half of the string is equal to its second half
 */
function isAPatternRepeatedTwice(id: Id): boolean {
  const stringId = id.toString();

  if (isEven(stringId.length)) {
    const firstHalf = getStringFirstHalf(stringId);
    const secondHalf = getStringSecondHalf(stringId);

    return firstHalf === secondHalf;
  }

  return false;
}

/**
 * Once again, we only need the get at most the first half of the string
 * If the string has an odd length, we only need to check up to the rounded down half
 * For example for length 7 we only need to check up to the string of the first three characters
 * Substrings that have lengths that cannot divide the id's length can be ignored
 */
function isAPatternRepeated(id: Id): boolean {
  const stringId = id.toString();

  if (stringId.length < 2) {
    return false;
  }

  for (
    let repeatingSequenceLength = 1;
    repeatingSequenceLength <= Math.floor(stringId.length / 2);
    repeatingSequenceLength++
  ) {
    if (isDivisibleBy(stringId.length, repeatingSequenceLength)) {
      const chunks = getStringChunks(stringId, repeatingSequenceLength);

      const isInvalid = areAllArrayElementsEqual(chunks);

      if (isInvalid) {
        return true;
      }
    }
  }

  return false;
}

async function main() {
  await printResults(part1, part2);
}

await main();
