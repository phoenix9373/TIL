import map from "./map.js";
import filter from "./filter.js";
import reduce from "./reduce.js";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

console.clear();
// 20000 미만의 product를 가져오고, map으로 변경 후, reduce로 총합 계산
console.log(
  reduce(
    (acc, cur) => acc + cur,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);

console.log(
  reduce(
    (acc, cur) => acc + cur,
    filter(
      (n) => n < 20000,
      map((p) => p.price, products)
    )
  )
);
