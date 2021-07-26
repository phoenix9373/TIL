const nums = [1, 2, 3, 4, 5];

// 명령적 방법
let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(total);

// reduce 방법 (f, 초기값, iter): 재귀적인 방법
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator](); // acc에 들어간 iter를 가져옴.
    acc = iter.next().value; // 첫 요소를 뽑아내고, 값을 가져옴.
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;
console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5)); // reduce 내부 로직
console.log(reduce(add, 0, [1, 2, 3, 4, 5]));

// 초기값이 생략된 경우, iter의 첫 요소를 초기값으로 활용하는 것처럼 동작한다.
console.log(reduce(add, [1, 2, 3, 4, 5]));

export default reduce;
