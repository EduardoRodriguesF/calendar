import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      user-select: none;
    }

    svg {
      cursor: pointer;
    }
  }
`;

export const Content = styled.table`
  tr {
    -webkit-user-select: none; /* for Safari */
    user-select: none;

    td,
    th {
      width: 32px;
      height: 32px;
      border-radius: 18px;
      text-align: center;

      &:first-child,
      &:last-child,
      &.otherMonth {
        color: #777;
      }

      &.today {
        background-color: #eaeaea;
      }

      &.selected {
        background: #0070f3;
        color: #fff;
      }
    }

    td:hover {
      color: #fff;
      background: #333;
    }
  }
`;
