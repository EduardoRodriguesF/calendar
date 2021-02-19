import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ name, placeholder, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      isErrored={!!error}
      ref={inputRef}
      type="text"
      name={name}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
