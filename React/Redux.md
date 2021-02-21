# Redux



[TOC]





## 설명

- React 상태관리 라이브러리
- React 컴포넌트 간 상태 관리를 더 효율적으로 할 수 있다.

## 궁금한 점

- `react-redux` 와 `redux` 의 차이점?
- Redux와 유사한 역할을 하는 `Context API`, `useReducer` 란?





## Redux 미들웨어(Middleware)

- 액션 객체가 리듀서에서 처리되기 전에 우리가 원하는 작업들을 수행할 수 있다.
- 특히 '비동기' 작업을 처리할 때, 주로 사용한다.

### 

####  ==================== ==================== 리듀서 함수란?  ==================== 

- 액션 함수를 가져와서 변화를 일으키는 함수

```javascript
function todoReducer(state, action) { // 현재 상태와 상태에 가할 액션 타입을 전달.
  switch (action.type) { // 타입에 따라 state(상태)에 각기 다른 액션을 가함.
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`); // useReducer에선 보통 이렇게 반환
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos); // useReducer를 사용하여
  return children;									// (리듀서 함수, 초기 state)를 설정한다.
}
```

 ==================== ==================== ==================== ====================



## 1. Redux에서 사용되는 키워드



### 액션

- 상태에 어떤 변화를 일으킬 때 사용하는 객체
- type 필드를 반드시 가지고 있어야한다.

```javascript
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
} // type 외의 필드는 자유롭게 작성한다.
```



### 액션 생성함수 (Action Creator)

- 액션을 만드는 함수
- 단순히 파라미터를 받고, 액션 객체 형태로 만들어준다.

```javascript
// 두 가지 방식이 있지만 export로 다른 파일에서 불러오는 것이 일반적이다.
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data
  };
}

// 화살표 함수로도 만들 수 있습니다.
export const changeInput = text => ({ 
  type: "CHANGE_INPUT",
  text
});
```



### 리듀서(Reducer)

- 변화를 일으키는 함수
- `state`, `action` 두 파라미터를 받아서 `state` 에 `action` 의 타입에 맞는 변화를 가한 뒤, 반환한다.

```javascript
function counter(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default: // 리듀서에서는 default로 state를 그대로 반환한다.
      return state;
  }
}
```

- tip) 리덕스를 사용할 때는 여러 개의 리듀서를 만든 후, 이를 합쳐서 루트 리듀서를 만들 수 있다.
  - 루트 리듀서 안의 리듀서는 '서브 리듀서'라고 한다.



### 스토어 (Store)

- 하나의 애플리케이션은 하나의 스토어를 가진다.
- 하나의 애플리케이션에서 모든 상태는 스토어에 저장된 `state`를 기준으로 변한다.

```javascript
// 스토어 생성하기

import { createStore } from "redux";

const store = createStore(rootReducer, composeWithDevTools())
// rootReducer : 여러 개의 subReducer를 하나로 통합한 Reducer
// ComposeWithDevTools : 브라우저 상에서 Redux 데브툴로 스토어의 상태를 확인할 수 있다.
```





### 디스패치 (dispatch)

- 스토어의 내장함수 중 하나
- 액션을 발생시키는 메서드(`액션이 디스패치 되었다` 라고 한다.)
- `dispatch(action)` 과 같이 `action`을 파라미터로 전달한다. (여기서 action은 객체? 아니면 함수?)
  - `action` 객체에 `TYPE`이 지정되어있으므로, 객체가 아닐까 생각해본다.



### 구독 (Subscribe)

- 스토어의 내장 함수 중 하나
- 함수 형태의 값을 파라미터로 받아온다.
- `subscribe` 함수에 특정 함수를 전달해주면, `액션이 디스패치 되었을` 때마다 전달해준 함수가 호출된다. (액션 실행마다 실행하는 콜백함수!?)





## 2. 리덕스의 3가지 규칙



### 1. 하나의 애플리케이션 안에는 하나의 스토어만 활용한다.

- 여러 개의 스토어를 만드는 것은 가능하나
- 상태관리를 일관적으로 하기 위해서는 하나의 스토어만 활용한다.



### 2. 상태는 읽기 전용이다.

- `state`를 업데이트할 때, `setState`를 쓴다.
- 배열을 업데이트할 때, `push`가 아닌 `concat` 를 사용하여 새로운 배열을 만들어낸다.
- 리덕스도 마찬가지로 기존의 상태는 건들이지 않고, 새로운 상태를 생성하여 '업데이트'하는 방식으로 사용한다.
- 리덕스는 내부적으로 `shallow equallity`를 수행하므로, 변화 감지 시 얕은 검사로 '좋은 성능'을 유지한다.



### 3. 변화를 일으키는 함수, 리듀서는 순수한 함수이어야한다.

- 리듀서는 '이전 상태'와 '액션 객체'를 파라미터로 받는다.
- 이전의 상태는 건드리지 않고, 변화된 새로운 상태를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 같은 값만 반환한다. (중요 -> 데이터가 무작위로 바뀌는 것 X)



## 리덕스 사용 준비 - 요약

1. `InitialState`를 지정한다.
2. `State`를 어떻게 변화시킬지에 대한 `TYPE` 을 정의한다.
3. 각 `TYPE` 에 따른 `Action Function`을 정의한다.
4. `Reducer` 함수를 만든다. 파라미터는 `(state = initialState, action) ` 을 받는다.
5. `createStore` 메서드로 스토어를 만든다.
6. `store 객체.getState()` 로 현재 스토어에 있는 `state` 를 알 수 있다.
7. `listener` 함수를 정의한다. 스토어 안에 있는 `state`가 변화할 때마다 호출되는 함수이다.
8. `store.subscribe(listener)` 를 변수에 할당하여 스토어에 있는 `state` 변화를 감지한다.
9. `store.dispatch(action function())` 으로 액션 함수를 실행하고, `state`에 변화를 가한다.



## 리덕스 모듈 - Root, Sub Reducer

- Redux는 Root Reducer를 기준으로 여러 개의 Sub Reducer를 만들 수 있다.
- `modules` 폴더를 만든 후, 각각 `counter.js` 와 `todos.js` 모듈을 만들었다.
- 그 후, 각각의 모듈에서 `TYPE`, `Action Function`, `Initial State`, `Reducer`를 정의한다.
- `modules` 폴더 내에 `index.js` 파일을 만든 후, `Root Reducer`로 만들자.

```javascript
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

// 각 리듀서를 객체 형태로 전달.
// combineReducers 메소드로 하나의 리듀서로 만들 수 있다.
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
```



- 그 다음, React에서 사용하는 `react-redux`를 `yarn add react-redux`로 설치한다.
- `src/index.js` 에 `Provider`와 `createStore`로 스토어를 생성하고, 모든 컴포넌트에서 리덕스 스토어에 접근할 수 있도록 한다.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./components/exercise";
import { createStore } from "redux";
import rootReducer from "./modules";

// react-redux
import { Provider } from "react-redux";

const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
  // 우리가 사용하는 어떤 컴포넌트던지 리덕스 스토어에 접근 가능하다.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


reportWebVitals(console.log);

```





# React Hook - Redux와 관련된 Hook들



## 1. useSelector

- Redux의 state를 조회할 때 사용하는 Hook이다.
- state를 조회했을 때, state가 변하지 않았다면 리렌더링하지 않는다. (React DevTool에서 확인)
- 스토어에 2개의 state에 대한 reducer가 등록되어있다. 하나의 값을 반환하려면 `state => state.todos` 와 같이 하나의 값만 반환하여 사용한다.
- 하지만 새로운 객체를 만드는 방식으로 useSelector를 사용하면, 매번 리렌더링 된다.

```javascript
// index.js
const rootReducer = combineReducers({
  counter,
  todos,
});

// TodosContainer.js : container는 state를 정의하고, HTML 태그를 사용하지 않고, 프레젠테이션 컴포넌트를 사용하여 렌더링한다.
const todos = useSelector(state => state.todos);

// 새로운 객체 만드는 방식
const {number, diff} = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff,
});
```



## 2. useSelector 최적화하기

```javascript
// 새로운 객체 만드는 방식
const {number, diff} = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff,
});
```

- 위 예제에서 useSelector를 최적화 하는 방법은 2가지가 있다.



### 1. 2개의 useSelector 활용하기

```javascript
const number = useSelector(state => state.counter.number);
const diff = useSelector(state => state.counter.diff);
```

- 위와 같이 useSelector를 나누게 되면 각각의 state 변화에 대응하여 변화가 있을 때만 리렌더링한다.



### 2. react-redux의 `shallowEqual` 함수를 2번째 인자로 전달

- 주의 : 말 그대로 '얕게 비교'한 `boolean` 값을 반환하므로 객체의 깊은 부분까지 확인할 수 없다.

```javascript
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    shallowEqual // equalityFn
  );
```

```javascript
equalityFn?: (left: any, right: any) => boolean
```

- 이전 값과 다음 값을 비교하여 `true`이면 리렌더링 하지 않고, `false`이면 렌더링을 한다.



- 추가적으로 비구조화를 사용해도 작동한다.
- `counter` 객체 안의 `number` 와 `diff` 를 비구조화로 다음과 같이 받는다.

```javascript
const { number, diff } = useSelector((state) => state.counter)

// counter = { number, diff }
```





## useDispatch

