import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoHead from "./components/TodoHead.jsx";
import TodoTemplates from "./components/TodoTemplates.jsx";

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplates>
        <TodoHead></TodoHead>
      </TodoTemplates>
    </>
  );
}

export default App;
