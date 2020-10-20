# 01_JavaScript



#### 오늘 오전 강의 내용

- Coding Style Guide
- AJAX
- Callback Function
- Promise



#### ECMAScript 요약

- 변수: `const`, `let` 을 주로 활용

  - 재할당, 재선언 가능 여부가 다름.
  - Hoisting 기능: 변수가 선언되기 이전에 출력을 해도 자체적으로 인식하는 기능

- 타입과 연산자

  - `null`과 `undefined`는 같다. 단, '비어있는 값이다.'는 표현은 `null`, '정의되지 않았다'의 표현은 `undefined`

- 조건 & 반복

  - `&&`, `||`, `===`(일치 연산자), `==`(동등 연산자)
  - `for in`: 배열의 경우 idx를, OBJ의 경우 key에 접근한다.
  - `for out`: 배열의 요소에 직접 접근한다.

- 함수

  - 변수 안에 함수를 담을 수 있다.
  - 익명 함수와 기명 함수가 있다.

- 자료 구조

  - `Array`: Array Helper Method(`map`, `filter`, `every`, `some`, `find`, `forEach`)

  - `Object`: JSON 형태처럼 KEY와 VALUE로 구성된 자료.

    - 축약 문법이 가능하다.

    - ```javascript
      // 아래의 경우 파이썬에서는 set이지만, JS에서는 obj 형태 즉, 'red': 'red'로 인식한다.
      const colors = {
          red,
          blue,
          green
      }
      ```

- ASI(Automatic Semicolon Insertion)

  - 원래 JS에서는 반드시 문장의 끝에 `;`를 붙여야한다.
  - 하지만 JS에서는 자동적으로 세미콜론(`;`)을 문장의 끝에 붙여서 실행한다.
  - 단, 반드시 세미콜론을 붙여야하는 경우도 있다.





## 01. Coding Style Guide

> [자바스크립트 코딩 스타일 가이드](https://standardjs.com/rules-kokr.html)





## 02. AJAX(Asynchronous JavaScrip And XML)

> 서버에 '좋아요' 버튼을 누르는 것을 요청했을 때, 좋아요 버튼만 변하고 나머지는 redirect 되지 않도록 하는 기술!



- AJAX란?
  - 서버와 통신하기 위해 `XMLHttpRequest` 객체를 사용하는 것
  - 강력한 특징 중 하나는 **페이지 전체를 refresh(reload, redirect)하지 않고서도 수행되는 "비동기성"**이다.
  - `Event`가 있으면 전체 페이지가 아닌 일부분만을 업데이트할 수 있다.
  - <u>페이지 새로고침 없이 서버에 요청</u>
  - <u>서버로부터 데이터를 받고 작업을 수행</u>
  - Response, HTML, JSON, XML 등을 받을 수 있다.

- XHR(XMLHttpRequest)
  - 전체 페이지의 새로고침없이 URL로부터 데이터를 받아올 수 있다.
  - AJAX 프로그래밍에 주로 사용된다.





#### Asychronous(비동기성)

- **혼자 일하기 때문에 wating있는 작업을 기다려주지 않는다.**
- 비동기적으로 동작한다 => 여러 개의 작업 중 waiting이 있는 경우, 다른 작업을 먼저 처리하고 waiting이 끝났을 때 해당 작업을 처리한다.
- **Single Thread**(일을 하는 사람이 한 명): 한 명이 혼자서 한 번에 하나의 일만 처리 가능. 즉, waiting이 있는 작업에 멍 때리지 않고, 다른 작업을 먼저 찾아 처리한다.





#### Event Loop(AJAX가 동작하는 방식)

- Call Stack
  - 요청이 들어올 때마다 해당 요청을 순차적으로 처리하는 Stack(LIFO) 형태의 자료 구조
  - 요청이 들어왔을 때, Stack에 아무것도 없다면 바로 넘겨주고 실행한다.
- Web API (Brower API)
  - JavaScript 엔진이 아닌 브라우저 영역에서 제공하는 API(DOM, AJAX, Timeout 등이 있다.)
  - 대표적으로 `setTimeout`, `xhr `등이 있다.
- Task Queue
  - 콜백 함수가 대기하는 Queue(FIFO) 형태의 자료 구조
- Event Loop(Stack의 Task가 완료됐는지 반복해서 확인 - Loop 개념)
  - Call Stack에 현재 실행 중인 Task가 없는지 확인하고 Task Queue에 Task가 있는지 확인
  - Call Stack에 현재 실행 중인 Task가 없으면 Task Queue에 있는 Task를 Call Stack으로 넘겨준다.



# 03. Callback Function

> 어떤 함수에 인자로 넘어가는 함수.







# 04. Promise

> 비동기 방식에서 처리하는 작업의 성공, 실패 여부를 객체로 표현.



- 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다.
- `Promise`는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체.
- `성공 시 속성`.then(<do Something>)
- `실패 시 속성`.then(<do Something>)



#### Promise - `async` & `await` function

- 함수 앞에서 `async`, 비동기적으로 동작하는 로직 앞에 `await`
- 



