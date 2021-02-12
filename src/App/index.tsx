import React from 'react';
import { Provider } from 'react-redux';

import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

import { Container } from './styles';

import store from '../store';
import Modal from '../components/Modal';
import Events from '../components/Events';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Modal />
      <Container>
        <Calendar />
        <Events />
        <Footer />
      </Container>
    </Provider>
  );
};

export default App;
