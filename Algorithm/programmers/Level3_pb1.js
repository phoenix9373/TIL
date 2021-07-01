function solution(A, B) {
  let answer = 0;
  let i = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for (let j = 0; j < A.length; j++) {
    if (i === A.length) break;
    if (A[j] < B[i]) {
      i++;
      answer += 1;
    } else {
      while (A[j] >= B[i]) {
        i++;
        if (i === B.length) return answer;
      }
      i++;
      answer += 1;
    }
  }

  return answer;
}
