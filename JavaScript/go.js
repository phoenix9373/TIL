import reduce from "./reduce.js";

// 몇 개의 인자가 들어올지 모르는 상태에서 args로 받음.
// reduce 함수의 특성을 이용하여 go 함수를 실행.
const add = (a, b) => a + b;

const go = (...args) => reduce((a, f) => f(a), args);

// 내부적으로 go 함수를 사용함.
//
const pipe =
  (
    f,
    ...fs // 3. 첫번째 함수만 따로 받고,
  ) =>
  (
    ...as // 4. 인자를 list로 받은 후,
  ) =>
    go(f(...as), ...fs); // 5. 실행한 값을 go 함수의 첫번째 인자로 넣어준다.

go(
  add(0, 1), // 1. 첫번째 인자에 2개의 값을 더한 경우를 사용하는 경우.
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  console.log
);

// 아래 인자로 받은 세 개의 함수를 연속으로 실행하는 새로운 함수를 pipe 함수로 만듦.
const f = pipe(
  (a, b) => a + b, // 2. pipe 함수의 경우 1번과 같은 효과를 갖기 위해 두 개를 인자로 받는다.
  (a) => a + 10,
  (a) => a + 100
);

console.log(f(0));

// go 함수 적용하기
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  console.log
);
