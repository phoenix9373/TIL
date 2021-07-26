const merge = function (left, right) {
  const res = []; // 임시 저장 공간
  const L1 = left.length;
  const L2 = right.length;

  let i = 0;
  let j = 0;
  while (i < L1 || j < L2) {
    if (i === L1) {
      res.push(right[j]);
      j++;
      continue;
    }

    if (j === L2) {
      res.push(left[i]);
      i++;
      continue;
    }

    if (left[i] > right[j]) {
      res.push(right[j]);
      j++;
    } else {
      res.push(left[i]);
      i++;
    }
  }

  return res;
};

const mergeSort = function (arr) {
  if (arr.length < 2) return arr;

  const L = arr.length;
  const m = Math.floor(L / 2);
  const left = arr.slice(0, m);
  const right = arr.slice(m);

  return merge(mergeSort(left), mergeSort(right));
};

console.log(mergeSort([1, 5, 8, 23, 2, 7, 9, 2, 3, 4, 76, 4, 2, 10]));

// merge Sort의 특징
// 1. 임시 저장 공간이 필요.
// 2. 퀵 소트와 함께 분할정복 방법이고, 평균적으로 빠른 정렬 방법이다.
// 3. Big-O(nlogn) 으로 비교적 빠르다.
