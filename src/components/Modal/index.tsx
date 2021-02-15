import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import { createEvent } from '../../store/modules/events/action';
import { toggleModal } from '../../store/modules/modal/action';
import Input from '../Input';

import { Container, Content, ModalHeader } from './styles';

interface IForm {
  title: string;
  description: string;
}

const Modal: React.FC = () => {
  const [formData, setFormData] = useState<IForm>({
    title: '',
    description: '',
  });
  const date = useSelector<IState, IDateState>(state => state.date);
  const modal = useSelector<IState, boolean>(state => state.modal);

  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(
      createEvent({
        title: formData.title,
        date: date.selected,
        time: new Date(),
        description: formData.description,
      }),
    );
  }, [date.selected, dispatch, formData]);

  return (
    <Container open={modal}>
      <Content>
        <ModalHeader>
          <span />
          <h2>New event</h2>
          <FiX onClick={handleModalClose} size={24} />
        </ModalHeader>
        <span>
          Date: {date.selected.getDate()}/{date.selected.getMonth() + 1}
        </span>
        <form>
          <Input
            placeholder="Title"
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <Input
            placeholder="Description"
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <button type="button" onClick={handleSubmit}>
            Confirm
          </button>
        </form>
      </Content>
    </Container>
  );
};

export default Modal;
