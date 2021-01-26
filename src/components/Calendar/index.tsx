import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import daysInMonth from '../../utils/daysInMonth';
import firstWeekDayInMonth from '../../utils/firstWeekDayInMonth';

import { Container, Content } from './styles';

interface ICalendarDays {
  day: number;
  other?: boolean;
  selected?: boolean;
  today?: boolean;
}

const Calendar: React.FC = () => {
  const [todayDate, _] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateMonth, setDateMonth] = useState(selectedDate.getMonth());
  const [dateYear, setDateYear] = useState(selectedDate.getFullYear());
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

  const selectDate = useCallback(
    (e, day) => {
      if (!e.classList.contains('otherMonth'))
        setSelectedDate(new Date(dateYear, dateMonth, day));
    },
    [dateMonth, dateYear],
  );

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
        today: false,
      });

      if (
        dateMonth === selectedDate.getMonth() &&
        dateYear === selectedDate.getFullYear() &&
        day === selectedDate.getDate()
      ) {
        newCalendar[newCalendar.length - 1].selected = true;
      }

      if (
        todayDate.getDate() === day &&
        todayDate.getMonth() === dateMonth &&
        todayDate.getFullYear() === dateYear
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

    setCalendarDays(newCalendarFormatted);
  }, [dateMonth, dateYear, selectedDate, todayDate]);

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
                }
                  ${d.today ? 'today' : ''}`}
                onClick={e => {
                  selectDate(e.target, d.day);
                }}
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
