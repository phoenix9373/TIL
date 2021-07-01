function solution(array, commands) {
  let answer = [];
  commands.forEach((c) => {
    const [i, j, k] = c;
    const sortedArray = array.slice(i - 1, j);
    sortedArray.sort();
    answer.push(sortedArray[k - 1]);
  });
  return answer;
}
