const log = console.log;

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        // 반환값에 같은 메서드를 반환하지 않으면, iterator를 순회할 때 iterable이 아니라는 error가 발생한다.
        return this; // 여기서의 this는 iterable 객체
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();

for (const a of iterable) log(a);
for (const a of iterator) log(a); // return하는 객체에 [Symbol.iterator]를 포함해야한다.

// 잘 구현된 iterator의 조건
// 1. 중간에 next()를 수행해도, for...of 문에서 중간에 진행한 값을 빼고 나머지를 잘 수행한다.
// 2. iterator와 iterator[Symbol.iterator]()는 동일하다.

const arr2 = [1, 2, 3];
for (const a of arr2) log(a);

// 1. iterable/iterator 프로토콜은 순회하는 객체에 대해 모두 적용된다.
// 2. const all = document.querySelectorAll('*') 의 경우에도 순회가 가능하다.
// 3. 순회가능한 이유는 all이 array이기 때문이 아니라, all[Symbol.iterator]를 가지고 있기 때문이다.
// 4. 따라서 [Symbol.iterator]를 가진 객체들은 모두 순회가능하다.
