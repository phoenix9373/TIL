function solution(genres, plays) {
  let answer = [];

  let genreObj = genres.reduce(
    (acc, curr, idx) => (
      (acc[curr] = acc[curr] ? acc[curr] + plays[idx] : plays[idx]), acc
    ),
    {}
  );

  let sortedGen = Object.keys(genreObj).sort((a, b) => {
    return genreObj[b] - genreObj[a];
  });

  let uniqueObj = {};
  for (let i = 0; i < genres.length; i++) {
    let gen = genres[i];
    uniqueObj[gen] = uniqueObj[gen]
      ? [...uniqueObj[gen], { idx: i, value: plays[i] }]
      : [{ idx: i, value: plays[i] }];
  }

  for (let i of sortedGen) {
    let sortedArr = uniqueObj[i].sort((a, b) => {
      return b.value - a.value;
    });
    for (let j = 0; j < 2; j++) {
      answer.push(sortedArr[j].idx);
      if (sortedArr.length === 1) {
        break;
      }
    }
  }

  return answer;
}

solution2(
  ["classic", "pop", "classic", "classic", "pop"],
  [500, 600, 150, 800, 2500]
);

// 다른 사람 풀이 1
function solution2(genres, plays) {
  let dic = {};
  genres.forEach((gen, idx) => {
    dic[gen] = dic[gen] ? dic[gen] + plays[idx] : plays[idx];
  });

  let dupDic = {};
  let tmp = genres
    .map((gen, idx) => ({
      genre: gen,
      count: plays[idx],
      idx: idx,
    }))
    .sort((a, b) => {
      if (a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
      if (a.count !== b.count) return b.count - a.count;
      return a.idx - b.idx;
    })
    .filter(({ genre, count, idx }) => {
      if (dupDic[genre] >= 2) return false;
      dupDic[genre] = dupDic[genre] ? dupDic[genre] + 1 : 1;
      return true;
    })
    .map((item) => item.idx);
  console.log(tmp);
}
