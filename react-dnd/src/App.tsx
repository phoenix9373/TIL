import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import Board from "./components/Board";

function App() {
  const [knightPosition, setKnightPosition] = useState<number[]>([0, 0]);

  function observer(knightPosition: number[]): void {
    setKnightPosition(knightPosition);
  }
  return (
    <div className="App">
      <Board knightPosition={knightPosition}></Board>
    </div>
  );
}

export default App;
