import type { Id, IdsRange, IdsRangeDetails, InvalidId } from "./types.ts";

export const INPUT_FILE_NAME = "input.txt";
export const IDS_RANGES_LIST_SEPARATOR = ",";
export const IDS_RANGE_SEPARATOR = "-";
export const TIME_ID = "main";

export function extractIdsRanges(line: string): IdsRange[] {
  return line.split(IDS_RANGES_LIST_SEPARATOR) as IdsRange[];
}

export function extractIdsRangeDetails(range: IdsRange): IdsRangeDetails {
  const [start, end] = range.split(IDS_RANGE_SEPARATOR);

  return {
    start: parseInt(start, 10),
    end: parseInt(end, 10),
  };
}

export function getInvalidIdsFromRange(
  range: IdsRangeDetails,
  iteratee: (id: Id) => boolean
): InvalidId[] {
  const invalidIds: InvalidId[] = [];

  for (let id = range.start; id <= range.end; id++) {
    if (iteratee(id)) {
      invalidIds.push(id);
    }
  }

  return invalidIds;
}
