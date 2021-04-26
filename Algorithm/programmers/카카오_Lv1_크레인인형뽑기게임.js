// 2차원 배열 transpose 하기
const test = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];

const a = [];

const arr = test.reduce(
  (result, row) => row.map((num, i) => [...(result[i] || []), row[i]]),
  []
);

console.log(arr.map((row) => row.reverse().filter((num) => num !== 0)));
// ==================================

// 내 풀이.
function solution(board, moves) {
  let barket = [];
  let count = 0;
  let n = board.length;

  for (let k of moves) {
    let j = k - 1; // col
    let i = 0; // row
    let doll = 0;

    while (board[i][j] === 0) {
      i++;
      if (i === n) {
        i--;
        break;
      }
    }

    doll = board[i][j];
    board[i][j] = 0;

    console.log(doll);
    if (doll > 0) {
      if (doll === barket[barket.length - 1]) {
        barket.pop();
        count += 2;
      } else {
        barket.push(doll);
      }
    }
  }

  return count;
}
