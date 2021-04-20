import React, { useReducer, useContext, createContext, Dispatch } from "react";

type Color = "red" | "orange" | "yellow";

type State = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { type: "SET_COUNT"; count: number }
  | { type: "SET_TEXT"; text: string }
  | { type: "SET_COLOR"; color: Color }
  | { type: "TOGGLE_GOOD" };

type SampleDispatch = Dispatch<Action>;

// Context 만들기
const SampleStateContext = createContext<State>({
  count: 0,
  text: "hello",
  color: "red",
  isGood: true,
});
const SampleDispatchContext = createContext<SampleDispatch>(() => null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNT":
      return {
        ...state,
        count: action.count, // count가 자동완성되며, number 타입인걸 알 수 있습니다.
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text, // text가 자동완성되며, string 타입인걸 알 수 있습니다.
      };
    case "SET_COLOR":
      return {
        ...state,
        color: action.color, // color 가 자동완성되며 color 가 Color 타입인걸 알 수 있습니다.
      };
    case "TOGGLE_GOOD":
      return {
        ...state,
        isGood: !state.isGood,
      };
    default:
      throw new Error("Unhandled action");
  }
}

export const SampleProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: "hello",
    color: "red",
    isGood: true,
  });
  return (
    <SampleStateContext.Provider value={state}>
      <SampleDispatchContext.Provider value={dispatch}>
        {children}
      </SampleDispatchContext.Provider>
    </SampleStateContext.Provider>
  );
};

export function useSampleState() {
  const state = useContext(SampleStateContext);
  if (!state) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useSampleDispatch(): SampleDispatch {
  const dispatch = useContext(SampleDispatchContext);
  if (!dispatch) throw new Error("Cannot find SampleProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
