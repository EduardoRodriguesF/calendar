import React, { useState, useEffect, useCallback } from 'react';
import daysInMonth from '../../utils/daysInMonth';
import firstWeekDayInMonth from '../../utils/firstWeekDayInMonth';

import { Container } from './styles';

interface ICalendarDays {
  day: number;
  other: boolean;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [dateMonth, setDateMonth] = useState(date.getMonth());
  const [dateYear, setDateYear] = useState(date.getFullYear());
  const [calendarDays, setCalendarDays] = useState<ICalendarDays[][]>([]);

  useEffect(() => {
    const newCalendar = [];
    const pastMonthDays = daysInMonth(dateMonth - 2, dateYear);
    const firstWeekDay = firstWeekDayInMonth(dateMonth, dateYear);

    for (let i = firstWeekDay - 1; i >= 0; i--) {
      newCalendar.push({
        day: pastMonthDays - i,
        other: true,
      });
    }

    for (let day = 1; day <= daysInMonth(dateMonth, dateYear); day++) {
      newCalendar.push({
        day,
        other: false,
      });
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

    setCalendarDays(newCalendarFormatted);
  }, [dateMonth, dateYear]);

  return (
    <Container>
      <tr>
        <th>S</th>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
      </tr>
      {calendarDays.map(row => (
        <tr>
          {row.map(d => (
            <td className={d.other ? 'otherMonth' : ''}>{d.day}</td>
          ))}
        </tr>
      ))}
    </Container>
  );
};

export default Calendar;
