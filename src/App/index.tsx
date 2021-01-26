import React from 'react';

import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

import { Container } from './styles';

const App: React.FC = () => {
  return (
    <Container>
      <Calendar />
      <Footer />
    </Container>
  );
};

export default App;
