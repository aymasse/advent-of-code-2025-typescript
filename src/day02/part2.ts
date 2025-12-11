import { resolve } from "node:path";
import {
  areAllArrayElementsEqual,
  getFirstLine,
  getStringChunks,
  isDivisibleBy,
  sum,
} from "../shared/utils.ts";
import {
  INPUT_FILE_NAME,
  TIME_ID,
  extractIdsRangeDetails,
  extractIdsRanges,
  getInvalidIdsFromRange,
  type Id,
} from "./shared.ts";

async function main() {
  console.time(TIME_ID);

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const firstLine = await getFirstLine(inputPath);
  const idsRanges = extractIdsRanges(firstLine);

  const invalidIds = idsRanges.map(extractIdsRangeDetails).flatMap((range) => {
    return getInvalidIdsFromRange(range, isIdInvalid);
  });

  const totalInvalidIds = sum(invalidIds);

  console.log(`Result: ${totalInvalidIds}`);

  console.timeEnd(TIME_ID);
}

function isIdInvalid(id: Id): boolean {
  const stringId = id.toString();

  if (stringId.length < 2) {
    return false;
  }

  /**
   * Once again, we only need the get at most the first half of the string
   * If the string has an odd length, we only need to check up to the rounded down half
   * For example for length 7 we only need to check up to the string of the first three characters
   * Substrings that have lengths that cannot divide the id's length can be ignored
   */
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

await main();
