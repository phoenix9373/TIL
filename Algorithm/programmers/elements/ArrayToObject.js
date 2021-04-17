let arr = ["a", "b", "c"];

// 1. Object.assign(target, source) : source에서 target으로 객체 속성 복사.(동일한 속성인 경우 source가 덮음.)
Object.assign({}, arr); // {0: 'a', 1: 'b', 2: 'c'}

// 2. ES6
let arrToObj = { ...arr };

// 3. 중간에 변경할 값이 있으면,
function toObj(arr) {
  let res = {};
  for (let i = 0; i < arr.length; i++) {
    // if (arr[i] !== undefined) : 중간에 비어있는 값 제어
    res[i] = arr[i];
  }
  return res;
}

let convertedObj = toObj(arr);

// 4. 3번에서 reduce 활용
let obj = arr.reduce((acc, cur, i) => {
  acc[i] = cur;
  return acc;
}, {}); // reduce의 두번째 인자는 initial value이다.
