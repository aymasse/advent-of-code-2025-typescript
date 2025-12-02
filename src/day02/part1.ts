import { getFirstLine, isEven, sum } from "../utils.ts";
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

  if (isEven(stringId.length)) {
    const firstHalf = stringId.substring(0, stringId.length / 2);
    const secondHalf = stringId.substring(stringId.length / 2);

    return firstHalf === secondHalf;
  }

  return false;
}

await main();
