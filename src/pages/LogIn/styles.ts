import styled, { keyframes } from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 1200px) {
    flex-direction: column-reverse;
  }
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
  @media only screen and (max-width: 1200px) {
    width: 100%;
    margin-top: 5em;
    height: 25em;
  }
  & img {
    width: 30em;
    @media only screen and (max-width: 1200px) {
      width: 18em;
    }
    @media only screen and (max-width: 768px) {
      width: 45%;
    }
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
  @media only screen and (max-width: 1200px) {
    padding-left: 0;
    margin: 0 auto;
    width: 30em;
    max-width: 100%;
  }

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
