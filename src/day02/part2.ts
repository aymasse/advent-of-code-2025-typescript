import { getFirstLine, getStringChunks, sum } from "../utils.ts";
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

  if (stringId.length < 2) {
    return false;
  }

  for (
    let repeatingSequenceLength = 1;
    repeatingSequenceLength <= Math.ceil(stringId.length / 2);
    repeatingSequenceLength++
  ) {
    const chunks = getStringChunks(stringId, repeatingSequenceLength);

    const isInvalid = chunks.every((chunk) => chunk === chunks.at(0));

    if (isInvalid) {
      return true;
    }
  }

  return false;
}

await main();
