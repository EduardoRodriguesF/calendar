import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { AiFillGithub } from 'react-icons/ai';

import { Container } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <p>
        Made with <FiHeart /> by{' '}
        <a href="https://github.com/EduardoRodriguesF">EduardoRodriguesF</a>
      </p>
      <a href="https://github.com/EduardoRodriguesF/calendar">
        <AiFillGithub size={32} />
      </a>
    </Container>
  );
};

export default Footer;
