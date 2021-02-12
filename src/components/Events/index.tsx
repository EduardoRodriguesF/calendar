import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { IEventsState } from '../../store/modules/events/types';

import { Container, Event } from './styles';

const Events: React.FC = () => {
  const { events } = useSelector<IState, IEventsState>(state => state.events);

  return (
    <Container>
      {events.map(e => (
        <Event>
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <span>{e.time.getTime()}</span>
        </Event>
      ))}
    </Container>
  );
};

export default Events;
