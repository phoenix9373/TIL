// arr : [1,2,3,4] 배열
// num: 3 4개 중 3개를 뽑음
function combination(arr, num) {
  let result = [];
  if (num == 1) return arr.map((e) => [e]);

  arr.forEach((e, i, array) => {
    let rest = array.slice(i + 1);
    let combinations = combination(rest, num - 1);
    let combiArr = combinations.map((x) => [e, ...x]);
    result.push(...combiArr);
  });
  return result;
}
/* [ [ 1, 2, 3 ], [ 1, 2, 4 ],
   [ 1, 3, 4 ], [ 2, 3, 4 ] ] */
