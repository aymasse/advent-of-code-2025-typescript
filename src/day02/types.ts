export type IdsRange = `${number}-${number}`;
export type Id = number;
export type InvalidId = number;

export interface IdsRangeDetails {
  start: Id;
  end: Id;
}
