import { map, filter, reduce } from "./fn.js";

const go = (...args) => reduce((a, f) => f(a), args);

// 1. 함수를 받아서
// 2. 함수를 리턴한다.
// 3. 리턴된 함수가 실행됐을 때, 인자가 2개 이상이면
// 4. 받은 함수에 인자를 넘겨 즉시 실행하고,
// 5. 인자가 2개보다 작다면, 함수를 다시 리턴한 후에
// 6. 이후에 받은 인자를 합쳐서 다시 함수를 실행한다.
const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// 사용 방법
const mult = curry((a, b) => a * b);
console.log(mult(3)(2)); // 6

const mult3 = mult(3);
console.log(mult3(10)); // 30
console.log(mult3(5)); // 15
console.log(mult3(3)); // 9

// map, filter, reduce 에 curry를 적용.

// 변경 전
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  console.log
);

// 1차 변경: curry로 반환된 filter, map, reduce
go(
  products,
  (products) => filter((p) => p.price < 20000)(products),
  (products) => map((p) => p.price)(products),
  (prices) => reduce(add)(prices),
  console.log
);

// 2차 변경: go 함수 내부적으로 앞 인자를 활용하여 결과값을 냄.
go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  console.log
);
