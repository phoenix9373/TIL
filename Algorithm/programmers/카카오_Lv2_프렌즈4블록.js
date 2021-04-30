const solution = (m, n, board) => {
  board = board.map((s) => s.split(""));

  while (true) {
    const arr = [];
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (
          board[i][j] &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i + 1][j + 1]
        ) {
          arr.push([i, j]);
        }
      }
    }

    if (!arr.length) {
      return [].concat(...board).filter((v) => !v).length;
    }

    for (let i = 0; i < arr.length; i++) {
      const r = arr[i][0];
      const c = arr[i][1];
      board[r][c] = 0;
      board[r + 1][c] = 0;
      board[r][c + 1] = 0;
      board[r + 1][c + 1] = 0;
    }

    // 땡겨오기
    for (let i = m - 1; i > 0; i--) {
      if (!board[i].some((v) => !v)) continue;

      for (let j = 0; j < n; j++) {
        if (board[i][j] === 0) {
          let r = i - 1;
          while (r >= 0) {
            if (board[r][j]) {
              board[i][j] = board[r][j];
              board[r][j] = 0;
              break;
            }
            r--;
          }
        }
      }
    }
  }
};

console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);
