function solution(clothes) {
  let clothesObj = {};
  for (let item of clothes) {
    if (clothesObj[item[1]]) {
      clothesObj[item[1]]++;
    } else {
      clothesObj[item[1]] = 1;
    }
  }

  let ans = 1;
  for (let key in clothesObj) {
    ans *= clothesObj[key] + 1;
  }
  return ans - 1;
}

let ans = solution([
  ["yellowhat", "headgear"],
  ["bluesunglasses", "eyewear"],
  ["green_turban", "headgear"],
]);
console.log(ans);

// 다른 사람 풀이 1
function solution1(clothes) {
  return (
    Object.values(
      clothes.reduce(
        (acc, curr) => (
          (acc[curr[1]] = acc[curr[1]] ? acc[curr[1]] + 1 : 1), acc
        ),
        {}
      )
    ).reduce((a, b) => a * (b + 1), 1) - 1
  );
}

let ans1 = solution1([
  ["yellowhat", "headgear"],
  ["bluesunglasses", "eyewear"],
  ["green_turban", "headgear"],
]);
console.log(ans1);
