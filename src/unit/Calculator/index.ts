export class Calculator {
  private readonly display?: IDisplay;
  private result: number = 0;

  constructor(display?: IDisplay) {
    this.display = display;
  }

  add(input: number): void {
    this.result += input;
    this.display?.set(`${this.result}`);
  }

  subtract(input: number): void {
    this.result -= input;
    this.display?.set(`${this.result}`);
  }

  getResult(): number {
    return this.result;
  }
}

export interface IDisplay {
  set: (input: string) => void;
  read: () => string;
}
