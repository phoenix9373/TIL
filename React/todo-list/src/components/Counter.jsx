import React, { useReducer, useRef } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "CHANGE_NAME":
      return { ...state, name: action.name };
    default:
      return state;
  }
}

const initialState = {
  count: 0,
  name: "jinwoo",
};

function Counter() {
  const [state, dispatch] = useReducer(countReducer, initialState);

  const { count, name } = state;

  const nameRef = useRef(name);

  const onIncrease = () => {
    dispatch({ type: "INCREMENT" });
  };

  const onDecrease = () => {
    dispatch({ type: "DECREMENT" });
  };

  const onChange = (e) => {
    if (e.code === "Enter") {
      dispatch({ type: "CHANGE_NAME", name: nameRef.current.value });
      e.target.value = "";
    }
  };

  return (
    <div>
      <h1>{count}</h1>
      <h2>{name}</h2>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <input ref={nameRef} onKeyPress={onChange} type="text" />
    </div>
  );
}

export default Counter;
