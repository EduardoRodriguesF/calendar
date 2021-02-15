import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  padding: 8px 16px;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#0070f3')};
  }
`;
