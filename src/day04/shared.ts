export interface Position {
  x: number;
  y: number;
}

export interface GridIteration {
  position: Position;
  value: boolean;
}

export const TIME_ID = "main";
export const INPUT_FILE_NAME = "input.txt";

export const LIMIT_TO_BE_ACCESSIBLE = 4;
export const PAPER_ROLL_PRESENCE_CHAR = "@";

export function populateGridRow(
  row: string,
  x: number,
  grid: PaperRollStorage
) {
  for (let y = 0; y < row.length; y++) {
    grid.set({ x, y }, row[y] === PAPER_ROLL_PRESENCE_CHAR);
  }
}

/**
 * Describes a square 0-indexed 2D grid to be used in various puzzles
 */

export class PaperRollStorage implements Iterable<GridIteration> {
  private size: number;
  private data: boolean[][];

  constructor(size: number) {
    this.size = size;
    this.data = Array.from({ length: size }, () => Array(size));
  }

  set(position: Position, value: boolean) {
    this.data[position.x][position.y] = value;
  }

  get(position: Position): boolean {
    return this.data[position.x][position.y];
  }

  /**
   * Get the Moore neighborhood of a given point in the grid, excluding the point itself
   */
  getMooreNeighborhoodOf(position: Position): boolean[] {
    const neighbors: boolean[] = [];

    for (
      let x = Math.max(position.x - 1, 0);
      x <= Math.min(position.x + 1, this.size - 1);
      x++
    ) {
      for (
        let y = Math.max(position.y - 1, 0);
        y <= Math.min(position.y + 1, this.size - 1);
        y++
      ) {
        if (!(x === position.x && y === position.y)) {
          neighbors.push(this.get({ x, y }));
        }
      }
    }

    return neighbors;
  }

  isLocationAccessible(position: Position): boolean {
    const neighbors = this.getMooreNeighborhoodOf({
      x: position.x,
      y: position.y,
    });
    const paperRolls = neighbors.filter((location) => location);

    return paperRolls.length < LIMIT_TO_BE_ACCESSIBLE;
  }

  removePaperRoll(position: Position) {
    this.set(position, false);
  }

  removePaperRolls(positions: Position[]) {
    for (const position of positions) {
      this.removePaperRoll(position);
    }
  }

  getAccessiblePaperRolls(): Position[] {
    return Iterator.from(this)
      .filter(({ value }) => value)
      .filter(({ position }) => this.isLocationAccessible(position))
      .map(({ position }) => position)
      .toArray();
  }

  [Symbol.iterator]() {
    let i = 0;

    const that = this;
    const maxI = this.size * this.size - 1;

    return {
      next() {
        const position = {
          x: Math.floor(i / that.size),
          y: i % that.size,
        };
        i++;

        return {
          value: {
            position,
            value: that.get(position),
          },
          done: i >= maxI,
        };
      },
    };
  }
}
