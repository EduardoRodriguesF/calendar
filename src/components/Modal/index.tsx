import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';

import { Container, Content, ModalHeader } from './styles';

const Modal: React.FC = () => {
  const handleModalClose = useCallback(() => {
    console.log('modal close');
  }, []);

  return (
    <Container>
      <Content>
        <ModalHeader>
          <h2>New event</h2>
          <FiX onClick={handleModalClose} size={24} />
        </ModalHeader>
      </Content>
    </Container>
  );
};

export default Modal;
