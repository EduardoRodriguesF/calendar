import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Container, Content } from './styles';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import {
  mockTodayDate,
  updateMonth,
  updateSelectedDate,
  updateYear,
} from '../../store/modules/date/action';
import generateCalendar from '../../utils/generateCalendar';
import { toggleModal } from '../../store/modules/modal/action';

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
  }, [date.month, date.year, dispatch]);

  const nextMonth = useCallback(() => {
    if (date.month === 11) {
      dispatch(updateMonth(0));
      dispatch(updateYear(date.year + 1));
    } else dispatch(updateMonth(date.month + 1));
  }, [date.month, date.year, dispatch]);

  const selectDate = useCallback(
    (e, day) => {
      if (!e.classList.contains('otherMonth'))
        dispatch(updateSelectedDate(new Date(date.year, date.month, day)));
    },
    [date.year, date.month, dispatch],
  );

  useEffect(() => {
    if (initialDate) {
      dispatch(mockTodayDate(initialDate));
      dispatch(updateMonth(date.today.getMonth()));
      dispatch(updateYear(date.today.getFullYear()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setCalendarDays(generateCalendar(date));
  }, [date, date.today, dispatch]);

  const handleModalOpen = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

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
      <button type="button" onClick={handleModalOpen}>
        Create event
      </button>
    </Container>
  );
};

export default Calendar;
