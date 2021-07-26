const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

// reduce 함수가 받는 인자 f를 사용자 임의대로 구성할 수 있기 때문에
// 다형성이 높은 함수라고 할 수 있다.
console.log(
  reduce((total_price, product) => total_price + product.price, 0, products)
);
