import { Display } from './Display';

describe('Display', () => {
  it('displays input', () => {
    const display = new Display();

    display.set('61');

    expect(display.read()).toBe('61');
  });
});
