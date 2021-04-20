function solution(progresses, speeds) {
  let answer = [];
  let distribution = [];
  for (let i = 0; i < progresses.length; i++) {
    distribution[i] = Math.ceil((100 - progresses[i]) / speeds[i]);
  }

  let first = distribution[0];
  let count = 0;
  for (let [idx, val] of distribution.entries()) {
    if (first >= val) {
      count++;
    } else {
      answer.push(count);
      first = val;
      count = 1;
    }

    if (idx === distribution.length - 1) {
      answer.push(count);
    }
  }

  console.log(answer);
  return answer;
}
solution([93, 30, 55], [1, 30, 5]);
solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]);

function solution2(progresses, speeds) {
  let answer = [];
  let distribution = progresses.map((prog, idx) =>
    Math.ceil((100 - prog) / speeds[idx])
  );

  let first = distribution[0];
  let count = 0;
  for (let [idx, val] of distribution.entries()) {
    if (first >= val) {
      count++;
    } else {
      answer.push(count);
      first = val;
      count = 1;
    }

    if (idx === distribution.length - 1) {
      answer.push(count);
    }
  }

  console.log(answer);
  return answer;
}
