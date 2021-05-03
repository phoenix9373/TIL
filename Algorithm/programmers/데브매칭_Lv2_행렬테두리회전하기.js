function solution(rows, columns, queries) {
  let ans = [];
  let maps = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 1; j < columns + 1; j++) {
      row.push(i * columns + j);
    }
    maps.push(row);
  }

  for (let q of queries) {
    let minValue = 10001;
    let [x1, y1, x2, y2] = q.map((k) => k - 1);

    let top = maps[x1].slice(y1, y2);
    let right = maps.slice(x1, x2).map((row) => row[y2]);
    let bottom = maps[x2].slice(y1 + 1, y2 + 1);
    let left = maps.slice(x1 + 1, x2 + 1).map((row) => row[y1]);

    for (let i = 0; i < top.length; i++) {
      maps[x1][i + y1 + 1] = top[i];
      if (top[i] < minValue) minValue = top[i];
    }

    for (let i = 0; i < right.length; i++) {
      maps[i + x1 + 1][y2] = right[i];
      if (right[i] < minValue) minValue = right[i];
    }

    for (let i = 0; i < bottom.length; i++) {
      maps[x2][i + y1] = bottom[i];
      if (bottom[i] < minValue) minValue = bottom[i];
    }

    for (let i = 0; i < left.length; i++) {
      maps[i + x1][y1] = left[i];
      if (left[i] < minValue) minValue = left[i];
    }

    ans.push(minValue);
  }

  return ans;
}
