import { Calculator, IDisplay } from '.';

describe('Calculator', () => {
  it('sums numbers', () => {
    const calculator = new Calculator();

    calculator.add(5);
    calculator.add(3);

    expect(calculator.getResult()).toBe(8);
  });

  it('subtracts numbers', () => {
    const calculator = new Calculator();

    calculator.add(8);
    calculator.subtract(2);

    expect(calculator.getResult()).toBe(6);
  });

  it('calls display.set() with operation result', () => {
    const displayMock: IDisplay = {
      set: jest.fn(),
      read: jest.fn(),
    };

    const calculator = new Calculator(displayMock);

    calculator.add(44);
    expect(displayMock.set).toHaveBeenLastCalledWith('44');

    calculator.subtract(2);
    expect(displayMock.set).toHaveBeenLastCalledWith('42');
  });
});
