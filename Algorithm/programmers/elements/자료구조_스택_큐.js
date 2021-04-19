// 1. 스택
// 개념 : Last in, Last out
// 예시 : 함수 실행 컨텍스트들이 쌓이는 'Call Stack', 브라우저 방문 기록이 쌓이는 'History Stack'

// 1-1. 배열 사용 시 push, pop으로 간단하게 구현가능
const stackArr = [1, 2, 3, 4];
stackArr.push(5); // Last in
stackArr.pop(); // Last out

// 1-2. 직접 구현 : top(스택 맨 위, 바로 나가는 아이템), push, pop, contains(아이템 존재 여부), size(현재 총 개수)
class Stack {
  constructor() {
    this.top = 0;
    this.storage = {};
  }

  size() {
    return this.top;
  }

  push(element) {
    this.top++;
    return (this.storage[this.top] = element);
  }

  pop() {
    if (this.top !== 0) {
      let data = this.storage[this.top];
      delete this.storage[this.top];
      this.top--;
      return data;
    }
  }
}

const stackObj = new Stack();
stackObj.push(3);
stackObj.push(4);
stackObj.size();
console.log(stackObj.pop());

// 2. 큐
// 개념 : First in, First out
// 예시 : JS 엔진에서 비동기 함수 실행 시, 콜백 함수들이 대기열로 들어오는 'Task Queue'
