function solution(begin, target, words) {
  if (!words.some((e) => e === target)) return 0;

  const charCheck = (word1, word2) => {
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        count++;
      }
    }
    if (count > 1 || count < 1) {
      return false;
    }
    return true;
  };

  let q = [{ word: begin, visited: [] }];

  while (q.length > 0) {
    let { word, visited } = q.shift();
    for (let i = 0; i < words.length; i++) {
      if (visited.includes(i)) {
        continue;
      }
      if (!charCheck(word, words[i])) {
        continue;
      }
      if (words[i] === target) {
        return visited.length + 1;
      }
      q.push({ word: words[i], visited: [...visited, i] });
    }
  }
  return 0;
}
