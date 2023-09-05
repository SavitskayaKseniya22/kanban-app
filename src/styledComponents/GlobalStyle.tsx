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
    font-weight: 400;
  }

  a, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  button{
    border:none;
    background-color: unset;
    cursor: pointer;
   
  }

.fa-plus,
.fa-pen, 
.fa-up-right-from-square {
  color: #3b8f43;
}

.fa-trash-can {
  color: #ed4a44;
  transition: 0.5s;
}

.fa-plus,
.fa-pen,
.fa-trash-can,
.fa-up-right-from-square {
  transition: color 0.5s;

  &:hover {
    color: #fca311;
    transition: color 0.5s;
  }
}

  

  h1, h2, h3, h4, h5 {
    font-family: "Oswald", sans-serif;
    margin:0;
  }

  main {
    display: flex;
    flex-grow: 2;
    position: relative;
    padding: 1rem;
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
