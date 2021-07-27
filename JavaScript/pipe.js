// go 함수를 활용해 연속된 함수
const add = (a, b) => a + b;
const total_price = pipe(
  map((p) => p.price),
  reduce(add)
);
