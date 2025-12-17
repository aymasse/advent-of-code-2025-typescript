import { resolve } from "node:path";
import {
  getMaxFromString,
  getReadLineInterface,
  printResults,
  stringToNumbersArray,
  sum,
} from "../shared/utils.ts";

type PowerBank = string;

const INPUT_FILE_NAME = "./input.txt";

async function part1() {
  const powerBanksVoltages: number[] = [];

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  for await (const line of readLineInterface) {
    powerBanksVoltages.push(getPowerBankMaxVoltage(line, 2));
  }

  const result = sum(powerBanksVoltages);

  return result;
}

async function part2() {
  const powerBanksVoltages: number[] = [];

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  for await (const line of readLineInterface) {
    powerBanksVoltages.push(getPowerBankMaxVoltage(line, 12));
  }

  const result = sum(powerBanksVoltages);

  return result;
}

function getPowerBankMaxVoltage(
  powerBank: PowerBank,
  nbBatteriesToTurnOn: number,
): number {
  if (powerBank.length < nbBatteriesToTurnOn) {
    return getVoltageFromEnabledBatteries(stringToNumbersArray(powerBank));
  }

  const enabledBatteries = [];

  let nbBatteriesLeftToTurnOn = nbBatteriesToTurnOn;
  let minSearchIndex = 0;

  while (nbBatteriesLeftToTurnOn > 0) {
    const stringToCheck = powerBank.substring(
      minSearchIndex,
      powerBank.length - nbBatteriesLeftToTurnOn + 1,
    );

    const max = getMaxFromString(stringToCheck);
    enabledBatteries.push(max);
    minSearchIndex = stringToCheck.indexOf(max.toString()) + minSearchIndex + 1;
    nbBatteriesLeftToTurnOn--;
  }

  return getVoltageFromEnabledBatteries(enabledBatteries);
}

function getVoltageFromEnabledBatteries(enabledBatteries: number[]): number {
  return parseInt(enabledBatteries.join(""), 10);
}

async function main() {
  await printResults(part1, part2);
}

await main();
