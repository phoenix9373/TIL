import React from "react";
import styled from "styled-components";

interface Props {
  black: boolean;
  children: React.ReactNode;
}

const Styled = {
  Square: styled.div`
    width: 100%;
    height: 100%;
    font-size: 5rem;
  `,
};

const Square = ({ black, children }: Props) => {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";
  return (
    <Styled.Square style={{ backgroundColor: fill, color: stroke }}>
      {children}
    </Styled.Square>
  );
};

export default Square;
