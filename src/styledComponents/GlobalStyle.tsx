import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  p,
  ul {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  main {
    display: flex;
    flex-grow: 2;
    position: relative;
  }
  
  #root {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
