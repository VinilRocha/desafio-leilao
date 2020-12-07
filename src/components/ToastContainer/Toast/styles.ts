import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasDescription?: boolean;
}

const toastTypeVariations = {
  info: css`
    background-color: #a7acd2;
    color: #293382;
  `,
  success: css`
    background-color: #aad3cc;
    color: #336267;
  `,
  error: css`
    background-color: #f14f72;
    color: #820620;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}

  ${props => toastTypeVariations[props.type || 'info']};

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      opacity: 0.8;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6px;
    border: 0;
    background: transparent;
    border: none;
    color: inherit;
  }
`;
