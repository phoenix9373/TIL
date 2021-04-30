const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrixT = matrix.reduce(
  (acc, row) => row.map((k, i) => [...(acc[i] || []), k]),
  []
);
console.log(matrixT);

console.log(matrix.reverse());
