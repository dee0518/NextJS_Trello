import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
  }

  body {
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyle;
