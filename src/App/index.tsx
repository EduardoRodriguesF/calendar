import React from 'react';

import Calendar from '../components/Calendar';

import { Container } from './styles';

const App: React.FC = () => {
  return (
    <Container>
      <h1>January 2020</h1>
      <Calendar />
    </Container>
  );
};

export default App;
