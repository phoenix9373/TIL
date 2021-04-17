// 1. Object.assign(target, source) : source에서 target으로 객체 속성 복사.(동일한 속성인 경우 source가 덮음.)
// 2. reduce 사용 : Array.prototype.reduce((acc, curr, idx) => {}, {})

function solution(participant, completion) {
  let obj = {};
  for (let i = 0; i < participant.length; i++) {
    if (obj[participant[i]] >= 1) {
      obj[participant[i]] += 1;
    } else {
      obj[participant[i]] = 1;
    }
  }

  for (let j = 0; j < completion.length; j++) {
    obj[completion[j]] -= 1;
  }
  for (let k in obj) {
    if (obj[k] === 1) {
      return k;
    }
  }
}

// 실행
const res = solution(
  ["mislav", "stanko", "mislav", "ana", "mislav"],
  ["mislav", "stanko", "ana", "mislav"]
);
console.log(res);

// 다른 사람 풀이 1 : reduce 활용, 쉼표 연산자 활용()
function solution(participant, completion) {
  var dic = completion.reduce(
    // acc = obj, t = curr
    (obj, t) => ((obj[t] = obj[t] ? obj[t] + 1 : 1), obj),
    {} // 초기값은 빈 객체
  );
  return participant.find((t) => {
    if (dic[t]) dic[t] = dic[t] - 1;
    else return true;
  });
}
