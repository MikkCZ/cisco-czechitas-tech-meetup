import type { IDisplay } from '.';

export class Display implements IDisplay {
  private value: string = '';

  set(input: string): void {
    this.value = input;
  }

  read(): string {
    return this.value;
  }
}
