import styled from 'styled-components';

interface IContainerProps {
  open: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 24px;

  span {
    text-align: center;
    margin-bottom: 14px;
  }

  form {
    display: flex;
    flex-direction: column;

    input + input {
      margin-top: 8px;
    }

    button {
      margin-top: 12px;
    }
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    width: 24px;
    height: 24px;
  }

  h2 {
    line-height: 0;
  }

  svg {
    margin-top: -24px;
    cursor: pointer;
  }
`;
