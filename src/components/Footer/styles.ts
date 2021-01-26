import styled from 'styled-components';

export const Container = styled.footer`
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  background-color: #20252d;

  p {
    color: #fff;

    svg {
      color: #d32c2c;
    }

    a {
      color: #0070f3;
    }
  }

  svg {
    color: #fff;
  }
`;
