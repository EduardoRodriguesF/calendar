import React, { useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import { createEvent } from '../../store/modules/events/action';
import { toggleModal } from '../../store/modules/modal/action';
import Button from '../Button';
import Input from '../Input';

import { Container, Content, ModalHeader } from './styles';

interface IForm {
  title: string;
  description: string;
  time: string;
}

const Modal: React.FC = () => {
  const [formData, setFormData] = useState<IForm>({
    title: '',
    description: '',
    time: '',
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
        time: formData.time,
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
          <div>
            <span>Horário:</span>
            <Input
              placeholder="00:00"
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
          <Input
            placeholder="Description"
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Button onClick={handleSubmit}>Confirm</Button>
        </form>
      </Content>
    </Container>
  );
};

export default Modal;
