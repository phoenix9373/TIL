import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate.jsx";
import TodoHead from "./components/TodoHead.jsx";
import TodoList from "./components/TodoList.jsx";
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
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplates>
    </>
  );
}

export default App;
