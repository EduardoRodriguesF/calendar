import firstWeekDayInMonth from '../../utils/firstWeekDayInMonth';

describe('daysInMonth function', () => {
  it('should return correct first weekday of given months', () => {
    expect(firstWeekDayInMonth(0, 2021)).toBe(5);
    expect(firstWeekDayInMonth(1, 2021)).toBe(1);
    expect(firstWeekDayInMonth(10, 2021)).toBe(1);
    expect(firstWeekDayInMonth(11, 2021)).toBe(3);
  });
});
