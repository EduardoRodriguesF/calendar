import React from 'react';
import { Provider } from 'react-redux';

import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

import { Container } from './styles';

import store from '../store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <Calendar />
        <Footer />
      </Container>
    </Provider>
  );
};

export default App;
