import styled from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.input<ContainerProps>`
  border-radius: 16px;
  border: 2px solid ${props => (props.isErrored ? '#c53030' : '#eaeaea')};
  padding: 6px 16px;
`;
