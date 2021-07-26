// 1. sort() 함수 : arr.sort([compareFunction])
// compareFunction이 생략되면 배열 요소는 문자열로 취급하여 유니코드 값 순서대로 정렬
// a,b 두 개의 파라미터를 입력하고, 리턴값이 0보다 작으면 -> a가 b보다 앞

// 2. 오름차순 정렬
let arr = [1, 2, 3, 4, 5];
console.log(
  "1 : ",
  arr.sort(function (a, b) {
    return a - b;
  })
);

// 3. 내림차순 정렬
console.log(
  "2 : ",
  arr.sort(function (a, b) {
    return b - a;
  })
);

// 4. 문자열 오름차순 정렬 : 유니코드 값 순서대로 정렬
const string = ["banana", "bb", "boy"];
console.log("4 : ", string.sort());

// 4-1. 문자열 길이 순서대로 오름차순
console.log(
  "4-1 : ",
  string.sort(function (a, b) {
    return a.length - b.length;
  })
);

// 5. 문자열 내림차순 정렬 : 유니코드 값 순서대로 정렬
console.log(
  "5 : ",
  string.sort(function (a, b) {
    if (a < b) return 1;
    if (a > b) return -1;
    if (a === b) return 0;
  })
);

// 5-1. 문자열 길이 순서대로 내림차순
console.log(
  "5-1 : ",
  string.sort(function (a, b) {
    return b.length - a.length;
  })
);

// 대소문자 구분 없이 => a 와 b에 각각 .toUpperCase() 메서드를 실행한다.

// 6. 객체 정렬하기
const obj = [
  { name: "banana", price: 3000 },
  { name: "apple", price: 1000 },
  { name: "bpple", price: 1000 },
  { name: "orange", price: 500 },
  { name: "apple", price: 500 },
];

// 6-1. 가격 오름차순
console.log(
  "6 : ",
  obj.sort(function (a, b) {
    return a.price - b.price;
  })
);

// 6-2. 가격 내림차순
console.log(
  "6-2 : ",
  obj.sort(function (a, b) {
    return b.price - a.price;
  })
);

// 6-3. 가격 오름차순 + 문자 내림차순
console.log(
  "6-3 : ",
  obj.sort(function (a, b) {
    if (a.price === b.price) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      if (a.name === b.name) return 0;
    }
    return a.price - b.price;
  })
);

// 6-4. 가격 오름차순 + 문자 오름차순
console.log(
  "6-4 : ",
  obj.sort(function (a, b) {
    if (a.price === b.price) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      if (a.name === b.name) return 0;
    }
    return a.price - b.price; // 양수면 저 -> 고(오름차순), 음수면 고 -> 저(내림차순)
  })
);
