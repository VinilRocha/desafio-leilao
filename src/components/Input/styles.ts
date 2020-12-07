import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 24px;
  border-radius: 5px;
  color: #a8a8b3;
  border: 2px solid #d9e0ec;
  margin-bottom: 2em;

  ${props =>
    props.isErrored &&
    css`
      border-color: #f24f6e;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #872572;
      color: #872572;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #872572;
    `}


  input {
    background-color: transparent;
    height: 100%;
    border: none;
    flex: 1;
    color: #3a3a3a;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  span {
    position: absolute;
    left: 0;
    bottom: -20px;
    font-size: 80%;
    font-weight: bold;
    color: #f24f6e;
  }

  svg {
    margin-right: 16px;
  }
`;
