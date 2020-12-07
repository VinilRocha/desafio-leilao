import styled, { keyframes } from 'styled-components';

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY( 5em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  margin: 3em 0;

  & form {
    margin-top: 2em;
    width: 25em;
    max-width: 100%;
    animation: ${appearFromBottom} 0.5s;
  }
`;
