import { go, pipe, map, filter, reduce, curry } from "./fn.js";

const log = console.log;

const products = [
  { name: "반팔티", price: 15000, quantity: 1 },
  { name: "긴팔티", price: 20000, quantity: 2 },
  { name: "핸드폰케이스", price: 15000, quantity: 3 },
  { name: "후드티", price: 30000, quantity: 4 },
  { name: "바지", price: 25000, quantity: 5 },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

// 총 수량
const total_quantity = sum((p) => p.quantity);

log(total_quantity(products));

// 총 비용
const total_price = sum((p) => p.price * p.quantity);

log(total_price(products));

// 위와 같이 추상화가 완료되면, 다른 데이터를 수용할 수 있을 정도로 추상화 레벨이 높아진다.
log(sum((u) => u.age, [{ age: 30 }, { age: 20 }, { age: 10 }]));
