import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #805ea8;
  padding-bottom: 1em;

  nav {
    display: flex;

    button {
      height: auto;
      font-weight: normal;
      font-size: 16px;
      padding: 0.5em;
      display: flex;
      align-items: center;
      width: 9em;
      justify-content: center;
      margin-left: 24px;
      background: #e12e47;
      &:hover {
        background: #f14d70;
      }
      & svg {
        margin-left: 8px;
      }
    }
  }
`;
