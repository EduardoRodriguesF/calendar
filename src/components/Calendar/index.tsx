import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import daysInMonth from '../../utils/daysInMonth';
import firstWeekDayInMonth from '../../utils/firstWeekDayInMonth';

import { Container, Content } from './styles';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import {
  mockTodayDate,
  updateSelectedDate,
} from '../../store/modules/date/action';

interface ICalendarProps {
  initialDate?: Date;
}

interface ICalendarDays {
  day: number;
  other?: boolean;
  selected?: boolean;
  today?: boolean;
}

const Calendar: React.FC<ICalendarProps> = ({
  initialDate = new Date(),
}: ICalendarProps) => {
  const date = useSelector<IState, IDateState>(state => state.date);
  const [dateMonth, setDateMonth] = useState(date.todayDate.getMonth());
  const [dateYear, setDateYear] = useState(date.todayDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<ICalendarDays[][]>([]);

  const dispatch = useDispatch();

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
        dispatch(updateSelectedDate(new Date(dateYear, dateMonth, day)));
    },
    [dateMonth, dateYear, dispatch],
  );

  useEffect(() => {
    if (initialDate) {
      dispatch(mockTodayDate(initialDate));
      setDateMonth(date.todayDate.getMonth());
      setDateYear(date.todayDate.getFullYear());
    }
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
        dateMonth === date.selectedDate.getMonth() &&
        dateYear === date.selectedDate.getFullYear() &&
        day === date.selectedDate.getDate()
      ) {
        newCalendar[newCalendar.length - 1].selected = true;
      }

      if (
        date.todayDate.getDate() === day &&
        date.todayDate.getMonth() === dateMonth &&
        date.todayDate.getFullYear() === dateYear
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
  }, [date, dateMonth, dateYear, dispatch, initialDate, selectDate]);

  return (
    <Container>
      <div>
        <FiChevronLeft
          onClick={previousMonth}
          size={24}
          data-testid="previous_month"
        />
        <h1 data-testid="date_display">
          {months[dateMonth]} {dateYear}
        </h1>
        <FiChevronRight
          onClick={nextMonth}
          size={24}
          data-testid="next_month"
        />
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
                data-testid={d.day}
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
