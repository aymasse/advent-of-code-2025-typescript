import type { DialCommand, DialDirection, DialDistance } from "./types.ts";

export const DIAL_SIZE = 100;
export const DIAL_START_VALUE = 50;
export const INPUT_FILE_NAME = "input.txt";

export function computeNextPosition(
  currentPosition: number,
  movement: number
): number {
  const simplifiedMovement = movement % DIAL_SIZE;

  return (DIAL_SIZE + currentPosition + simplifiedMovement) % DIAL_SIZE;
}

export function extractNumberFromDialCommand(command: DialCommand): number {
  const direction = command.at(0) as DialDirection;
  const distance = parseInt(command.substring(1), 10) as DialDistance;

  return direction === "L" ? -distance : distance;
}
