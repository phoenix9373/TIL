function solution(n, weak, dist) {
  let answer = 10;
  let initialArr = Array.from({ length: n }, () => 0);
  weak.forEach((i) => (arr[i] = 1));

  const dfs = (nextArr, nextDist, rest, persons) => {
    const isEnd = nextArr.reduce((a, c) => a + c, 0) === 0;
    if (isEnd) {
      if (answer > persons) answer = persons;
      return;
    }

    if (nextDist.length === 0) return;

    for (let i = nextDist.length - 1; i >= 0; i--) {
      let restIdx = rest;
      for (let j of restIdx) {
      }
    }
  };

  return answer;
}
