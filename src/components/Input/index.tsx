import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  return <Container type="text" placeholder={placeholder} />;
};

export default Input;
