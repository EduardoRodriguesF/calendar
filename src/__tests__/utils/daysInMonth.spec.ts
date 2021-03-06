import daysInMonth from '../../utils/daysInMonth';

describe('daysInMonth function', () => {
  it('should return correct number of days in given months', () => {
    expect(daysInMonth(0, 2021)).toBe(31);
    expect(daysInMonth(1, 2021)).toBe(28);
    expect(daysInMonth(10, 2021)).toBe(30);
    expect(daysInMonth(11, 2021)).toBe(31);
  });
});
