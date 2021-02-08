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
  updateMonth,
  updateSelectedDate,
  updateYear,
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
  // const [dateMonth, setDateMonth] = useState(date.today.getMonth());
  // const [dateYear, setDateYear] = useState(date.today.getFullYear());
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
    if (date.month === 0) {
      dispatch(updateMonth(11));
      dispatch(updateYear(date.year - 1));
    } else dispatch(updateMonth(date.month - 1));
  }, [date, dispatch]);

  const nextMonth = useCallback(() => {
    if (date.month === 11) {
      dispatch(updateMonth(0));
      dispatch(updateYear(date.year + 1));
    } else dispatch(updateMonth(date.month + 1));
  }, [date, dispatch]);

  const selectDate = useCallback(
    (e, day) => {
      if (!e.classList.contains('otherMonth'))
        dispatch(updateSelectedDate(new Date(date.year, date.month, day)));
    },
    [date, dispatch],
  );

  useEffect(() => {
    if (initialDate) {
      dispatch(mockTodayDate(initialDate));
      dispatch(updateMonth(date.today.getMonth()));
      dispatch(updateYear(date.today.getFullYear()));
    }
    const newCalendar = [];

    let pastMonthDays;

    if (date.month === 0) {
      pastMonthDays = daysInMonth(12, date.year - 1);
    } else {
      pastMonthDays = daysInMonth(date.month, date.year);
    }
    const daysThisMonth = daysInMonth(date.month + 1, date.year);
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

    setCalendarDays(newCalendarFormatted);
  }, [date, dispatch, initialDate, selectDate]);

  return (
    <Container>
      <div>
        <FiChevronLeft
          onClick={previousMonth}
          size={24}
          data-testid="previous_month"
        />
        <h1 data-testid="date_display">
          {months[date.month]} {date.year}
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
