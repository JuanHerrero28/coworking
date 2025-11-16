import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: #f8f8f8;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .custom-toast {
  background-color:rgb(255, 255, 255);
  color:rgb(0, 0, 0);
  font-family: 'Open Sans', sans-serif;
  font-size: 10pt;
  border-radius: 8px;
  
  padding: 1rem;
  text-align: center;
  
}
`;
