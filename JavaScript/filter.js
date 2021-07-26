const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
};

console.log(...filter((p) => p.price < 20000, products));

// 따라서 filter는 Array 외에도 iterable을 받아 동작을 수행할 수 있다.
console.log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      yield 6;
    })()
  )
);

export default filter;
