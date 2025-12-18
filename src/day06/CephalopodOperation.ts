import { product, sum } from "../shared/utils.ts";

export type Addition = "+";
export type Multiplication = "*";
export type Operation = Addition | Multiplication;

export class CephalopodOperation {
  elements: number[] = [];
  operation: Operation = "+";

  addElement(element: number): void {
    this.elements.push(element);
  }

  setOperation(operation: Operation): void {
    this.operation = operation;
  }

  getResult(): number {
    if (this.operation === "+") {
      return sum(this.elements);
    } else {
      return product(this.elements);
    }
  }
}
