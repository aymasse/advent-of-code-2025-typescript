import { resolve } from "node:path";
import {
  getReadLineInterface,
  getStringWords,
  printResults,
  sum,
} from "../shared/utils.ts";
import { CephalopodOperation, type Operation } from "./CephalopodOperation.ts";

const INPUT_FILE_NAME = "input.txt";

async function part1() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  const problems: CephalopodOperation[] = [];

  for await (const line of readLineInterface) {
    getStringWords(line).forEach((element, index) => {
      if (element) {
        problems[index] ??= new CephalopodOperation();

        const numberElement = parseInt(element, 10);

        if (Number.isInteger(numberElement)) {
          problems[index].addElement(numberElement);
        } else {
          problems[index].setOperation(element as Operation);
        }
      }
    });
  }

  const results = problems.map((problem) => problem.getResult());
  const totalSum = sum(results);

  return totalSum;
}

async function part2() {
  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  const lines: string[] = [];

  for await (const line of readLineInterface) {
    lines.push(line);
  }

  const operatorsLine: string = lines.pop()!;
  const operatorIndexes: number[] = [];

  operatorsLine?.split("").forEach((element, index) => {
    if (element === "+" || element === "*") {
      operatorIndexes.push(index);
    }
  });

  const problems = operatorIndexes.map((operatorIndex, index) => {
    const operation = new CephalopodOperation();

    operation.operation = operatorsLine[operatorIndex] as Operation;

    const separatorIndex = operatorIndexes[index + 1]
      ? operatorIndexes[index + 1] - 1
      : lines[0].length;

    for (let i = operatorIndex; i < separatorIndex; i++) {
      let element = "";

      lines.forEach((line) => {
        if (line[i]) {
          element += line[i];
        }
      });

      operation.addElement(parseInt(element, 10));
    }

    return operation;
  });

  const results = problems.map((problem) => problem.getResult());
  const totalSum = sum(results);

  return totalSum;
}

async function main() {
  await printResults(part1, part2);
}

await main();
