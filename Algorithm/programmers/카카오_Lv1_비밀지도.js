function solution(n, arr1, arr2) {
  return arr1.map((v, i) => {
    console.log((v | arr2[i]).toString());
    return addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, (a) =>
      +a ? "#" : " "
    );
  });
}

const addZero = (n, s) => {
  return "0".repeat(n - s.length) + s;
};

let ans = solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]);
console.log(ans);
