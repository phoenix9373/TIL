const testBoard = [
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 0, 1],
];

function solution(block, board) {
  let answer = 0;
  let length = board.length;
  let di = [
    [0, 1, 2],
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, -1],
    [0, 0, 1],
    [0, 0, 1],
  ];
  let dj = [
    [0, 0, 0],
    [0, 1, 2],
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 1],
    [0, 1, 0],
  ];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let copyBoard = board.map((b) => b.slice());
      let isPass = true;

      console.log(i, j);
      for (let k; k < 3; k++) {
        let ni = i + di[block][k];
        let nj = j + dj[block][k];

        if (
          ni < 0 ||
          ni >= length ||
          nj < 0 ||
          nj >= length ||
          copyBoard[ni][nj] === 1
        ) {
          isPass = false;
          break;
        }
        copyBoard[ni][nj] = 1;
      }

      if (!isPass) continue;
      const lines = getLineCount(copyBoard);
      if (answer < lines) answer = lines;
    }
  }

  return answer;
}

function getLineCount(arr) {
  let L = arr.length;
  let res = 0;
  arr.forEach((line) => {
    let sum = line.reduce((acc, cur) => acc + cur, 0);
    if (sum === L) res++;
  });
  return res;
}

solution(0, [
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 0, 1],
]);
