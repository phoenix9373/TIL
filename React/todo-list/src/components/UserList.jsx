import React, { useContext } from "react";
import { UserDispatch } from "../App";

// React.memo : props or 렌더링 결과가 달라지지 않는 한, 메모이징한 결과 재사용.
const User = React.memo(function User({ user }) {
  // UserDispatch.Provider 컴포넌트 내부에 있는 컴포넌트에 한해 context 사용.
  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{ cursor: "pointer", color: user.active ? "green" : "black" }}
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users && users.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
}

export default React.memo(UserList);
