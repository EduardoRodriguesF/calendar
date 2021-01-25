import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import daysInMonth from '../../utils/daysInMonth';
import firstWeekDayInMonth from '../../utils/firstWeekDayInMonth';

import { Container, Content } from './styles';

interface ICalendarDays {
  day: number;
  other?: boolean;
  selected?: boolean;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [dateMonth, setDateMonth] = useState(date.getMonth());
  const [dateYear, setDateYear] = useState(date.getFullYear());
  const [calendarDays, setCalendarDays] = useState<ICalendarDays[][]>([]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const previousMonth = useCallback(() => {
    if (dateMonth === 0) {
      setDateMonth(11);
      setDateYear(dateYear - 1);
    } else setDateMonth(dateMonth - 1);
  }, [dateMonth, dateYear]);

  const nextMonth = useCallback(() => {
    if (dateMonth === 11) {
      setDateMonth(0);
      setDateYear(dateYear + 1);
    } else setDateMonth(dateMonth + 1);
  }, [dateMonth, dateYear]);

  useEffect(() => {
    const newCalendar = [];

    let pastMonthDays;

    if (dateMonth === 0) {
      pastMonthDays = daysInMonth(12, dateYear - 1);
    } else {
      pastMonthDays = daysInMonth(dateMonth, dateYear);
    }
    const daysThisMonth = daysInMonth(dateMonth + 1, dateYear);
    const firstWeekDay = firstWeekDayInMonth(dateMonth, dateYear);

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
      });

      if (
        dateMonth === date.getMonth() &&
        dateYear === date.getFullYear() &&
        day === date.getDate()
      ) {
        newCalendar[newCalendar.length - 1].selected = true;
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

    setCalendarDays(newCalendarFormatted);
  }, [dateMonth, dateYear, date]);

  return (
    <Container>
      <div>
        <FiChevronLeft onClick={previousMonth} size={24} />
        <h1>
          {months[dateMonth]} {dateYear}
        </h1>
        <FiChevronRight onClick={nextMonth} size={24} />
      </div>
      <Content>
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
              <td
                className={`${d.other ? 'otherMonth' : ''} ${
                  d.selected ? 'selected' : ''
                }`}
                onClick={() => setDate(new Date(dateYear, dateMonth, d.day))}
              >
                {d.day}
              </td>
            ))}
          </tr>
        ))}
      </Content>
    </Container>
  );
};

export default Calendar;
