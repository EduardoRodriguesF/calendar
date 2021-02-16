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
  timeHour: string;
  timeMinute: string;
}

const Modal: React.FC = () => {
  const [formData, setFormData] = useState<IForm>({
    title: '',
    description: '',
    timeHour: '',
    timeMinute: '',
  });
  const date = useSelector<IState, IDateState>(state => state.date);
  const modal = useSelector<IState, boolean>(state => state.modal);

  const dispatch = useDispatch();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleModalClose = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(
      createEvent({
        title: formData.title,
        date: date.selected,
        time: `${formData.timeHour}:${formData.timeMinute}`,
        description: formData.description,
      }),
    );

    handleModalClose();
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
          {months[date.selected.getMonth()]} {date.selected.getDate()},{' '}
          {date.selected.getFullYear()}
        </span>
        <form>
          <Input
            placeholder="Title"
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <div>
            <span>Time:</span>
            <Input
              type="number"
              max={24}
              min={0}
              placeholder="00"
              onChange={e =>
                setFormData({ ...formData, timeHour: e.target.value })
              }
            />
            :
            <Input
              type="number"
              max={59}
              min={0}
              placeholder="00"
              onChange={e =>
                setFormData({ ...formData, timeMinute: e.target.value })
              }
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
