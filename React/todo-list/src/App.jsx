import React, { useReducer, useMemo } from "react";

// Components
// import Counter from "./components/Counter";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

// Immer
import produce from "immer";

// CSS
import "./App.css";

function countActiveUsers(users) {
  console.log("활성 사용자 수 세는 중");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    // Immer 패키지 사용
    // case "CREATE_USER":
    //   return produce(state, (draft) => {
    //     draft.users.push(action.user);
    //   });
    // case "TOGGLE_USER":
    //   return produce(state, (draft) => {
    //     const user = draft.users.find((user) => user.id === action.id);
    //     user.active = !user.active;
    //   });
    // case "REMOVE_USER":
    //   return produce(state, (draft) => {
    //     const index = draft.users.findIndex((user) => user.id === action.id);
    //     draft.users.splice(index, 1);
    //   });
    // Immer 패키지 미사용 : 사실 이 경우, 데이터 깊이가 깊지 않아 기존 방법이 낫다.
    case "CREATE_USER":
      return {
        inputs: initialState.inputs, // 초기화
        users: state.users.concat(action.user), // action.user에 inputs 데이터를 담아서 보냄.
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
