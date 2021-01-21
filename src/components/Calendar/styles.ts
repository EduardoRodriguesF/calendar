import styled from 'styled-components';

export const Container = styled.table`
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
    }

    td:hover {
      color: #fff;
      background: #333;
    }
  }
`;
