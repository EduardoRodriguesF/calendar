import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import { IEventsState } from '../../store/modules/events/types';

import { Container, Event } from './styles';

const Events: React.FC = () => {
  const { events } = useSelector<IState, IEventsState>(state => state.events);
  const date = useSelector<IState, IDateState>(state => state.date);

  const selectedDateEvents = useMemo(() => {
    return events.filter(
      e =>
        e.date.getDate() === date.selected.getDate() &&
        e.date.getMonth() === date.selected.getMonth() &&
        e.date.getFullYear() === date.selected.getFullYear(),
    );
  }, [events, date]);

  return (
    <Container>
      {selectedDateEvents.map(e => (
        <Event>
          <h3>{e.title}</h3>
          <span>{e.time}</span>
          <p>{e.description}</p>
        </Event>
      ))}
    </Container>
  );
};

export default Events;
