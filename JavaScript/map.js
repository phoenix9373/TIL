const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// 1. for문
let names = [];
for (const p of products) {
  names.push(p.name);
}
console.log(names);

// 2. map
// iter: map 함수가 받는 인자는 iterable이다.
// 추상화: f 함수를 받아서 어떤 처리를 할지 f에 온전히 위임한다.
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

console.log(map((p) => p.name, products));

// =======================================================================================================================================
// 1. 이터러블 프로토콜을 따른 map의 다형성 1
// console.log(document.querySelectorAll("*").map((el) => el.nodeName));

// 2. 이터러블 프로토콜을 따른 map의 다형성 2
let m = new Map();

m.set("a", 10);
m.set("b", 20);

console.log(new Map(map(([k, a]) => [k, a * 2], m)));

export default map;
