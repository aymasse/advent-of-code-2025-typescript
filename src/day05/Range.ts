export class Range {
  public start: number;
  public end: number;
  public size: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.size = end - start + 1;
  }

  includes(element: number): boolean {
    return this.start <= element && element <= this.end;
  }

  isOverlapping(range: Range): boolean {
    return (
      this.includes(range.start) ||
      this.includes(range.end) ||
      range.includes(this.start) ||
      range.includes(this.end)
    );
  }

  toString() {
    return `${this.start}-${this.end}`;
  }

  /**
   * Merge current range with given range if they're overlapping
   */
  mergeWith(range: Range): Range {
    if (!this.isOverlapping(range)) {
      throw new Error(
        `Ranges ${this} and ${range} are not overlapping and cannot be merged`,
      );
    }

    if (this.contains(range)) {
        return this;
    }

    if (range.contains(this)) {
        return range;
    }

    if (this.includes(range.start)) {
        return new Range(this.start, range.end);
    }

    return new Range(range.start, this.end);
  }

  /**
   * Checks if range is completly included in current range
   */
  contains(range: Range): boolean {
    return this.includes(range.start) && this.includes(range.end);
  }
}