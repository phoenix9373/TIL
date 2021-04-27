import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
