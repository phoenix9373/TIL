export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

export const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

export const add = (a, b) => a + b;

export const go = (...args) => reduce((a, f) => f(a), args);

// 내부적으로 go 함수를 사용함.
//
export const pipe =
  (
    f,
    ...fs // 3. 첫번째 함수만 따로 받고,
  ) =>
  (
    ...as // 4. 인자를 list로 받은 후,
  ) =>
    go(f(...as), ...fs); // 5. 실행한 값을 go 함수의 첫번째 인자로 넣어준다.
