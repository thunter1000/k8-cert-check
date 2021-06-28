import {sum} from './jest';

describe('Given two numbers', () => {
  it('returns the sum', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
