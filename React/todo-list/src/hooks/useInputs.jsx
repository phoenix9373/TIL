import { useCallback, useReducer } from "react";

// state를 직접 바꾸는 곳.
function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.name]: action.value };
    case "RESET":
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = ""; // 빈 오브젝트의 해당 key 값 value를 초기화.
        return acc; // 누적된 객체를 반환.
      }, {}); // 초기값 : {} (빈 오브젝트)
    default:
      return state;
  }
}

function useInputs(initialForm) {
  // change, reset
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    // reducer를 호출하며, 데이터를 전달만 하는 곳.
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);

  return [form, onChange, reset];
}

export default useInputs;

// ---------------------------- Reducer를 사용하지 않음.

// import { useState, useCallback } from "react";

// function useInputs(initialForm) {
//   const [form, setForm] = useState(initialForm);
//   // change
//   const onChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setForm((form) => ({ ...form, [name]: value }));
//   }, []);
//   const reset = useCallback(() => setForm(initialForm), [initialForm]);
//   return [form, onChange, reset];
// }

// export default useInputs;
