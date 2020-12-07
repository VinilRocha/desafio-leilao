import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  type?: 'andamento' | 'finalizado';
}

const cardTypes = {
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

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5em 0;
`;

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 1em;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  min-width: calc(33.3% - 1em);
  max-width: calc(33.3% - 1em);
  margin-bottom: 1.5em;
  position: relative;

  ${props => cardTypes[props.type || 'andamento']};

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

export const CardButtons = styled.div`
  display: flex;
  margin-top: 2em;

  button {
    height: auto;
    font-size: 14px;
    font-weight: normal;
    padding: 0.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    transition: opacity 0.5s;
    &:hover {
      opacity: 0.9;
    }
    &:nth-child(1) {
      background: #3b1c55;
    }
    &:nth-child(2) {
      background: #602878;
    }
    &:nth-child(3) {
      background: #af5482;
    }
    &:nth-child(4) {
      background: #f14d70;
    }
    &:not(:last-of-type) {
      margin-right: 0.3em;
    }
  }
`;
