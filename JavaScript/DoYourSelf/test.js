function combination(arr, sel) {
  const result = [];
  if (sel === 1) return arr.map((v) => [v]);
  arr.forEach((v, idx, arr) => {
    const fixed = v;
    const restArr = arr.slice(idx + 1);
    const comArr = combination(restArr, sel - 1);
    const res = comArr.map((v) => [fixed, ...v]);
    result.push(...res);
  });
  return result;
}

function solution(needs, r) {
  let answer = 0;
  let srcCount = needs[0].length; // 부품 개수
  let comCount = needs.length; // 완제품 개수
  let srcArr = Array.from({ length: srcCount }, (v, i) => i); // 부품 개수의 배열
  let combRobot = combination(srcArr, r); // 살 수 있는 로봇 조합

  combRobot.forEach((arr) => {
    let checkArr = srcArr.filter((val) => !arr.includes(val));
    let tmpAns = 0;

    needs.forEach((product) => {
      let check = 0;
      for (let i of checkArr) {
        if (product[i] === 0) {
          check++;
        }
      }
      if (check === checkArr.length) {
        tmpAns++;
      }
    });

    if (answer < tmpAns) {
      answer = tmpAns;
    }
  });

  return answer;
}

console.log(
  solution(
    [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
      [1, 0, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
    3
  )
);
