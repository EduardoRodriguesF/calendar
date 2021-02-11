import daysInMonth from './daysInMonth';
import firstWeekDayInMonth from './firstWeekDayInMonth';

interface IDate {
  month: number;
  year: number;
  selected: Date;
  today: Date;
}

function generateCalendar(date: IDate) {
  const newCalendar = [];

  let pastMonthDays;

  if (date.month === 0) {
    pastMonthDays = daysInMonth(11, date.year - 1);
  } else {
    pastMonthDays = daysInMonth(date.month - 1, date.year);
  }
  const daysThisMonth = daysInMonth(date.month, date.year);
  const firstWeekDay = firstWeekDayInMonth(date.month, date.year);

  for (let i = firstWeekDay - 1; i >= 0; i--) {
    newCalendar.push({
      day: pastMonthDays - i,
      other: true,
    });
  }

  for (let day = 1; day <= daysThisMonth; day++) {
    newCalendar.push({
      day,
      other: false,
      selected: false,
      today: false,
    });

    if (
      date.month === date.selected.getMonth() &&
      date.year === date.selected.getFullYear() &&
      day === date.selected.getDate()
    ) {
      newCalendar[newCalendar.length - 1].selected = true;
    }

    if (
      date.today.getDate() === day &&
      date.today.getMonth() === date.month &&
      date.today.getFullYear() === date.year
    ) {
      newCalendar[newCalendar.length - 1].today = true;
    }
  }

  let day = 1;
  for (let i = newCalendar.length; i < 42; i++) {
    newCalendar.push({
      day,
      other: true,
    });
    day++;
  }

  const newCalendarFormatted = [];

  for (let i = 0; i < 6; i++) {
    newCalendarFormatted.push(newCalendar.slice(i * 7, (i + 1) * 7));
  }

  return newCalendarFormatted;
}

export default generateCalendar;
