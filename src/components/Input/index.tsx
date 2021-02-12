import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...rest }) => {
  return <Container type="text" placeholder={placeholder} {...rest} />;
};

export default Input;
