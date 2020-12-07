import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  max-width: 100%;
  height: 70px;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  background: #574bc2;
  transition: background-color 0.5s;
  &.navigation-button {
    width: 14em;
    height: 47px;
    margin-top: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    & svg {
      margin-left: 16px;
    }
  }
  &:hover {
    background: ${shade(0.2, '#574bc2')};
  }
`;
