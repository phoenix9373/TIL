// odds

// 무한수열 표현 가능 : next()를 호출할 때마다 값을 반환하기 때문.
function* infinity(i = 0) {
  while (true) yield i++;
}

// iterator에 제한을 걸어줌.
function* limit(n, iter) {
  for (const a of iter) {
    yield a;
    if (a === n) return;
  }
}

function* odds(n) {
  for (const a of limit(n, infinity(1))) {
    if (a % 2) yield a;
    if (a === n) return;
  }
}

let iter2 = odds(10);
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
console.log(iter2.next());
