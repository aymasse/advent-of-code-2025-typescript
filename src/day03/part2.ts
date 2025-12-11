import { resolve } from "node:path";
import { getReadLineInterface, sum } from "../shared/utils.ts";
import { getPowerBankMaxVoltage, INPUT_FILE_NAME, TIME_ID } from "./shared.ts";

async function main() {
  console.time(TIME_ID);

  const powerBanksVoltages: number[] = [];

  const inputPath = resolve(import.meta.dirname, INPUT_FILE_NAME);
  const readLineInterface = getReadLineInterface(inputPath);

  for await (const line of readLineInterface) {
    powerBanksVoltages.push(getPowerBankMaxVoltage(line, 12));
  }

  const result = sum(powerBanksVoltages);

  console.log(`Result: ${result}`);
  console.timeEnd(TIME_ID);
}

await main();
