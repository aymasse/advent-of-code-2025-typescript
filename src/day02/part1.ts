import {
  getFirstLine,
  getStringFirstHalf,
  getStringSecondHalf,
  isEven,
  sum,
} from "../utils.ts";
import {
  INPUT_FILE_NAME,
  extractIdsRangeDetails,
  extractIdsRanges,
  getInvalidIdsFromRange,
} from "./shared.ts";
import type { Id } from "./types.ts";

const TIME_ID = "main";

async function main() {
  console.time(TIME_ID);

  const firstLine = await getFirstLine(INPUT_FILE_NAME);
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

  /**
   * An invalid id has a form like this: XYZXYZ
   * It MUST be a string with a pattern repeated once
   * Therefore, only strings with an even length can be invalid ids
   * We only need to check if the first half of the string is equal to its second half
   */
  if (isEven(stringId.length)) {
    const firstHalf = getStringFirstHalf(stringId);
    const secondHalf = getStringSecondHalf(stringId);

    return firstHalf === secondHalf;
  }

  return false;
}

await main();
