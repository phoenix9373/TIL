import { reduce } from "./fn.js";

// 1. 일반적인 range 함수
const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    console.log(i, "range");
    res.push(i);
  }
  return res;
};

console.log(range(5)); // [1,2,3,4,5]

var list = range(3); // 실행 즉시, range(3)이 배열로 평가받음.
console.log(list); // [0, 1, 2, 3]
console.log(reduce(add, list));

console.clear();

// 2. 느긋한 L.range 함수
// next()를 실행하거나, 순회하기 전까지
// L.range 함수가 실행되지 않음.
// 즉, 다시 말해, next()를 한 번씩 찍을때마다 L.range 내부 로직이
// 한번씩 실행된다.
const L = {};
L.range = function* (l) {
  console.log("hi"); // 출력되지 않음.
  let i = -1;
  while (++i < l) {
    console.log(i, "L.range"); // 출력되지 않음.
    yield i;
  }
};

var list = L.range(4);
console.log(list); // iterator
console.log(reduce(add, list)); // 3
