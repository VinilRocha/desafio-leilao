import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'andamento' | 'finalizado';
}

const containerTypes = {
  andamento: css`
    .card-status {
      background-color: #a7acd2;
      color: #293382;
    }
  `,
  finalizado: css`
    background: #e7e7e7;
    .card-status {
      background-color: #dadada;
      color: #787878;
    }
  `,
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1em;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  max-width: 30em;
  position: relative;
  margin: 3em 0;

  ${props => containerTypes[props.type || 'andamento']};

  &:not(:nth-child(3n)) {
    margin-right: 1.5em;
  }
  h2 {
    padding-right: 3em;
    color: #1b2141;
  }
  & .card-title span {
    position: absolute;
    top: 19px;
    right: 19px;
    font-size: 80%;
    text-transform: uppercase;
    background: #872572;
    color: #fff;
    padding: 0.3em 1em;
    border-radius: 2px;
  }

  & .card-info {
    padding: 2em 0;
    & p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #3c3c3c;
      line-height: 2em;
    }
  }

  & .card-status {
    width: fit-content;
    padding: 0.3em 1em;
    border-radius: 2px;
  }
`;
