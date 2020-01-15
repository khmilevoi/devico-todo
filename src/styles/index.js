import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    font-size: 14px;
    font-family: sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;
