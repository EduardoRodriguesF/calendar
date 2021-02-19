import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { IState } from '../../store';
import { IDateState } from '../../store/modules/date/types';
import { createEvent } from '../../store/modules/events/action';
import { toggleModal } from '../../store/modules/modal/action';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../Button';
import Input from '../Input';

import { Container, Content, ModalHeader } from './styles';

interface IForm {
  title: string;
  description: string;
  hour: string;
  minute: string;
}

const Modal: React.FC = () => {
  const [error, setError] = useState('');
  const formRef = useRef<FormHandles>(null);
  const [formData, setFormData] = useState<IForm>({
    title: '',
    description: '',
    hour: '',
    minute: '',
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

  const handleSubmit = useCallback(
    async (data: IForm) => {
      try {
        formRef.current?.setErrors({});
        setError('');

        const schema = Yup.object().shape({
          title: Yup.string().required('Nome obrigatório'),
          hour: Yup.number().required('Selecione um horário'),
          minute: Yup.number(),
          description: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(
          createEvent({
            title: formData.title,
            date: date.selected,
            time: `${formData.hour}:${
              (formData.minute && formData.minute) || 0
            }`,
            description: formData.description,
          }),
        );

        handleModalClose();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [
      date.selected,
      dispatch,
      formData.description,
      formData.hour,
      formData.minute,
      formData.title,
      handleModalClose,
    ],
  );

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="Title"
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <div>
            <span>Time:</span>
            <Input
              name="hour"
              type="number"
              max={23}
              min={0}
              placeholder="00"
              onChange={e => setFormData({ ...formData, hour: e.target.value })}
            />
            :
            <Input
              name="minutes"
              type="number"
              max={59}
              min={0}
              placeholder="00"
              onChange={e =>
                setFormData({ ...formData, minute: e.target.value })
              }
            />
          </div>
          <Input
            name="description"
            placeholder="Description"
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Button type="submit">Confirm</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Modal;
