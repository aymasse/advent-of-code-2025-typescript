import { resolve } from "node:path";
import { getReadLineInterface, printResults, sum } from "../shared/utils.ts";
import { Range } from "./Range.ts";

const INPUT_FILE_NAME = "input.txt";
const PRODUCTS_RANGE_SEPARATOR = "-";

async function part1() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  const freshProductsRanges: Range[] = [];
  const productIds: number[] = [];

  for await (const line of readLineInterface) {
    if (isProductsRange(line)) {
      freshProductsRanges.push(parseProductRange(line));
    } else if (isProductId(line)) {
      productIds.push(parseProductId(line));
    }
  }

  const freshProductsIds: number[] = getFreshProductsOnly(
    productIds,
    freshProductsRanges,
  );

  return freshProductsIds.length;
}

async function part2() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  const freshProductsRanges: Range[] = [];

  for await (const line of readLineInterface) {
    if (isProductsRange(line)) {
      freshProductsRanges.push(parseProductRange(line));
    } else if (line === "") {
      break;
    }
  }

  let didWeMergeRanges: boolean;

  do {
    didWeMergeRanges = false;

    for (let index = 0; index < freshProductsRanges.length; index++) {
      if (didWeMergeRanges) {
        break;
      }

      const referenceRange = freshProductsRanges[index];

      for (let j = index + 1; j < freshProductsRanges.length; j++) {
        const rangeToCheck = freshProductsRanges[j];

        if (referenceRange.isOverlapping(rangeToCheck)) {
          const mergedRange = referenceRange.mergeWith(rangeToCheck);

          // Remove checked range from array
          freshProductsRanges.splice(j, 1);
          // Remove reference range from array and add merged range in its place
          freshProductsRanges.splice(index, 1, mergedRange);

          didWeMergeRanges = true;
          break;
        }
      }
    }
  } while (didWeMergeRanges);

  const totalNumberOfFreshProducts = sum(
    freshProductsRanges.map((range) => range.size),
  );

  return totalNumberOfFreshProducts;
}

function isProductsRange(line: string): boolean {
  return line.includes(PRODUCTS_RANGE_SEPARATOR);
}

function isProductId(line: string): boolean {
  try {
    const productId = parseProductId(line);

    return Number.isInteger(productId);
  } catch (error) {
    return false;
  }
}

function parseProductRange(line: string): Range {
  const [start, end] = line.split(PRODUCTS_RANGE_SEPARATOR);

  return new Range(parseInt(start, 10), parseInt(end, 10));
}

function parseProductId(line: string): number {
  return parseInt(line, 10);
}

function getFreshProductsOnly(
  productIds: number[],
  freshProductsRanges: Range[],
): number[] {
  return productIds.filter((productId) =>
    freshProductsRanges.some((productsRange) =>
      productsRange.includes(productId),
    ),
  );
}

async function main() {
  await printResults(part1, part2);
}

await main();
