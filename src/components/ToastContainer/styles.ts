import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
  z-index: 9;
  @media only screen and (max-width: 768px) {
    padding: 5px;
    max-width: 100%;
  }
`;
