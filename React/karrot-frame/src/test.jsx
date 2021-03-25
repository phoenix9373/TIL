import React from "react";
import { Navigator } from "karrotframe";

const App: React.FC = () => {
  return (
    <Navigator
      theme="Cupertino"
      onClose={() => {
        console.log("닫기버튼이 눌렸습니다");
      }}
    >
      {/*...*/}
    </Navigator>
  );
};

export default App;
