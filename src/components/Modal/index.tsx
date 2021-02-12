import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { toggleModal } from '../../store/modules/modal/action';
import Input from '../Input';

import { Container, Content, ModalHeader } from './styles';

const Modal: React.FC = () => {
  const modal = useSelector<IState, boolean>(state => state.modal);

  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  return (
    <Container open={modal}>
      <Content>
        <ModalHeader>
          <h2>New event</h2>
          <FiX onClick={handleModalClose} size={24} />
        </ModalHeader>
        <form>
          <Input placeholder="Title" />
        </form>
      </Content>
    </Container>
  );
};

export default Modal;
