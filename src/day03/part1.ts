import { getReadLineInterface, sum } from "../shared/utils.ts";
import { getPowerBankMaxVoltage, INPUT_FILE_NAME } from "./shared.ts";

const TIME_ID = "main";

async function main() {
  console.time(TIME_ID);

  const powerBanksVoltages: number[] = [];

  const readLineInterface = getReadLineInterface(INPUT_FILE_NAME);

  for await (const line of readLineInterface) {
    powerBanksVoltages.push(getPowerBankMaxVoltage(line, 2));
  }

  const result = sum(powerBanksVoltages);

  console.log(`Result: ${result}`);
  console.timeEnd(TIME_ID);
}

await main();
