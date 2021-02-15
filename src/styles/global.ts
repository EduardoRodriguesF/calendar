import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', arial, helvetica, sans-serif;
  }
  
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
