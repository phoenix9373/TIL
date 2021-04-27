import React from "react";
import styled from "styled-components";
import Knight from "./Knight";
import Square from "./Square";
import BoardSquare from "./BoardSquare";
import { moveKnight, canMoveKnight } from "./Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// types
type Props = {
  knightPosition: number[];
};

type SquareContainerTypes = {
  key: number;
};

// styled-components
const Styled = {
  Board: styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(8, 12.5vh);
    grid-template-rows: repeat(8, 12.5vh);
  `,
  SquareContainer: styled.div<SquareContainerTypes>`
    width: 100%;
    height: 100%;
  `,
};

// private function
function renderSquare(i: number, knightPosition: number[]): React.ReactNode {
  const x = i % 8;
  const y = Math.floor(i / 8);

  return (
    <Styled.SquareContainer key={i} onClick={() => handleSquareClick(x, y)}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </Styled.SquareContainer>
  );
}

function renderPiece(
  x: number,
  y: number,
  [knightX, knightY]: number[]
): React.ReactNode {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

function handleSquareClick(toX: number, toY: number): void {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

// ReactElement
const Board = ({ knightPosition }: Props) => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.Board>{squares}</Styled.Board>
    </DndProvider>
  );
};

export default Board;
