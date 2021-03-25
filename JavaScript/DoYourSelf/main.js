const app = document.querySelector(".app");

// 배열 선언
const array = [1, 2, 3, 4, 5];

// for문
for (let i = 0; i < array.length; i++) {
  console.log(i);
}

// for문 2
for (let i of array) {
  console.log("축약 : ", i);
}

// 마지막 인덱스 접근
console.log(array[array.length - 1]);

// array API
const arr = new Array();
console.log(arr);

array.forEach((i) => {
  console.log(i);
});

arr2 = array.map((i) => i + 1);
arr3 = array.map((i) => {
  return i + 1;
});
arr4 = array.filter((i) => {
  return i > 1;
});

console.log(arr2);
console.log(arr3);
console.log(arr4);

console.log("============================");

arr.push(1);
arr.push(2);
arr.push(3);
arr.push(4);
arr.push(5);

console.log(arr);

arr.pop(0);
console.log(arr);

arr.unshift(0);
console.log(arr);

arr.shift();
console.log(arr);

arr.splice(0, 1);
console.log(arr);

arr.splice(1, 1, 5, 6, 7, 8, 9);
console.log(arr);

console.log(arr.concat(arr2));
console.log(arr2.concat(arr));

a = arr.includes(2);
console.log(a);

console.log(arr.indexOf(9));
console.log(arr.lastIndexOf(9));

console.clear();

const fruits1 = ["apple", "banana", "orange"];
console.log(fruits1.join(", "));

const fruits2 = "🍎, 🥝, 🍌, 🍒";
console.log(fruits2.split(","));

const array1 = [1, 2, 3, 4, 5];
console.log(array1.reverse());

const array2 = [1, 2, 3, 4, 5];
console.log(array2);
const newArray = array2.slice(1, 3);
console.log(newArray);
console.log(array2);

console.clear();

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];

console.log(students.find((student) => student.score === 90));
const c = students.find((student) => student.score === 90);
console.log(typeof c);

const b = students.filter((student) => {
  return student.score === 90;
});
console.log(typeof b);
console.log(c === b);

const scores = students.map((student) => ({
  score: student.score,
}));
console.log(scores);

console.log(students.some((student) => student.score < 50));
console.log(students.every((student) => student.score < 50));
console.log(students.reduce((prev, curr) => (prev += curr.score), 0) / 5);
console.log(
  students
    .map((student) => student.score)
    .join(",")
    .split(",")
);
console.log(students.sort((a, b) => b.score - a.score));
