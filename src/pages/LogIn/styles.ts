import styled, { keyframes } from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
`;

export const BackgroundLogin = styled.div`
  width: 60%;
  height: 50em;
  background-color: #eda0c4;
  border-radius: 100% 33% 55% 50% / 45% 70% 65% 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;

  & img {
    width: 30em;
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateY( 5em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;
  padding-left: 5em;
  animation: ${appearFromRight} 1s;

  h1 {
    font-size: 36px;
    color: #1b2141;
    line-height: 46px;
    margin-bottom: 2em;
  }
  form {
    width: 100%;
  }
`;
