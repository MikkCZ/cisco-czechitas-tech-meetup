import { Calculator } from '.';
import { Display } from './Display';

describe('Calculator integration', () => {
  it('updates display', () => {
    const display = new Display();
    const calculator = new Calculator(display);

    calculator.add(44);
    expect(display.read()).toBe('44');

    calculator.subtract(2);
    expect(display.read()).toBe('42');
  });
});
