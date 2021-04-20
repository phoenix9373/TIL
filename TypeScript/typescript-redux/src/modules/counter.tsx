import React from "react";

// type
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

// action
export const increase = () => ({
  type: INCREASE,
});
export const decrease = () => ({
  type: DECREASE,
});
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});

// action 객체에 대한 타입
// ReturnType<typeof ______> 는 특정 함수의 반환값을
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>;

// reducer

export const counter = () => {
  return <div></div>;
};
