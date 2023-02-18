import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } 

  a:link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }

  a:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }
`;
