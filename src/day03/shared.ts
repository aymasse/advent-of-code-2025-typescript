import { getMaxFromString, stringToNumbersArray } from "../shared/utils.ts";
import type { PowerBank } from "./types.ts";

export const INPUT_FILE_NAME = "./input.txt";
export const TIME_ID = "main";

export function getPowerBankMaxVoltage(
  powerBank: PowerBank,
  nbBatteriesToTurnOn: number
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
      powerBank.length - nbBatteriesLeftToTurnOn + 1
    );

    const max = getMaxFromString(stringToCheck);
    enabledBatteries.push(max);
    minSearchIndex = stringToCheck.indexOf(max.toString()) + minSearchIndex + 1;
    nbBatteriesLeftToTurnOn--;
  }

  return getVoltageFromEnabledBatteries(enabledBatteries);
}

export function getVoltageFromEnabledBatteries(
  enabledBatteries: number[]
): number {
  return parseInt(enabledBatteries.join(""), 10);
}