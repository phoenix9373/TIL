function binarySearch(target, arr) {
  // arr는 정렬된 상태.
  arr.sort((a, b) => {
    return a - b;
  });

  let l = 0; // first
  let h = arr.length - 1; // last
  let m = Math.floor((h + l) / 2);

  while (Math.abs(h - l) > 1) {
    if (target <= arr[m]) {
      h = m - 1;
      m = Math.floor((h + l) / 2);
    } else {
      l = m + 1;
      m = Math.floor((h + l) / 2);
    }
  }

  return [arr[h], arr[l]];
}

console.log(binarySearch(17, [1, 9, 12, 18, 19, 21, 32, 45, 98, 101]));
