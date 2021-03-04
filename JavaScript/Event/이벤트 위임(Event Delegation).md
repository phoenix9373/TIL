# 이벤트 위임(Event Delegation)

> 2021-03-03



### 이벤트 위임이란?

- 이벤트 버블링으로 부모 요소에서 자식 요소의 모든 이벤트에 접근할 수 있다.
- 따라서 자식 요소의 이벤트를 부모 요소 레벨에서 관리할 수 있다.
- 그래서 수많은 자식 요소에 하나하나 이벤트를 추가하기보다!
- 부모 요소에 이벤트를 주고(위임), 이를 자식 요소에서 콜백함수를 실행할 수 있도록 한다.



## 질문 리스트



### 1. 이벤트 위임의 장점

> 질문 : 이벤트 위임을 사용하는 장점?

- 메모리 절약이 가장 크다.
- 1000개의 li 태그가 있을 때, 부모 요소인 ul에 이벤트 등록하는 것은 1개의 함수를 만든다.
- 반면 1000개의 li 태그에 대해 모두 이벤트를 등록하려면 1000개의 함수가 필요하고, 이는 메모리 낭비를 야기한다.



### 2. querySelectorAll() vs querySelector()

- `querySelectorAll`은 nodelist 값을 반환한다.
- nodelist 값을 Array로 만드려면 `Array.from()`을 활용한다.
- `querySelector`는 element를 반환한다.
- element는 node이고, node는 eventTarget이기 때문에 `addEventListener`, `remove`, `dispatch` 등을 활용할 수 있다.
- `querySelectorAll`은 nodelist 이기 때문에 이벤트 리스너가 불가능하다.
- 따라서 `forEach`를 활용해 쪼개어 사용하지만, 좋은 방법은 아니다.

