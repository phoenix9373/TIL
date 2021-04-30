function binarySearch(target, dataArray) {
  target--;
  let l = 0;
  let h = dataArray.length - 1;
  let m = Math.floor((h + l) / 2);
  while (h - l > 1) {
    if (dataArray[m] > target) {
      h = m;
      m = Math.floor((h + l) / 2);
    } else {
      l = m + 1;
      m = Math.floor((h + l) / 2);
    }
  }
  if (dataArray[l] === dataArray[h]) {
    return dataArray.length - l;
  } else {
    return dataArray.length - h;
  }
}

console.log(
  binarySearch(100, [1, 2, 3, 4, 100, 100, 100, 100, 100, 200, 200, 200])
);
