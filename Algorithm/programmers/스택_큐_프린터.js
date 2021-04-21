function solution(priorities, location) {
  let arr = priorities.map((prior, idx) => [prior, idx]);
  let order = [];

  while (arr.length > 0) {
    let maxValue = 0;
    let maxIdx = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i][0] >= maxValue) {
        maxValue = arr[i][0];
        maxIdx = i;
      }
    }

    let left = arr.splice(0, maxIdx + 1);
    order.push(left[left.length - 1]);
    if (left.length > 1) arr = arr.concat(left.slice(0, left.length - 1));
  }

  let ans;
  order.forEach((item, idx) => {
    if (item[1] === location) ans = idx;
  });
  return ans + 1;
}

solution([1, 1, 9, 1, 1, 1], 0);

// 다른 사람들의 풀이
function solution(priorities, location) {
  let list = priorities.map((item, idx) => ({
    check: i === location,
    value: item,
  }));

  let count = 0;
  while (true) {
    let cur = list.shift();
    if (list.some((item) => item.value > cur.value)) {
      list.push(cur);
    } else {
      count++;
      if (cur.check) return count;
    }
  }
}

// 다른 사람들의 풀이2
function solution(priorities, location) {
  let arr = priorities.map((priority, index) => {
    return {
      index: index,
      priority: priority,
    };
  });

  let queue = [];

  while (arr.length > 0) {
    let firstEle = arr.shift();
    let hasHighPriority = arr.some((ele) => ele.priority > firstEle.priority);
    if (hasHighPriority) {
      arr.push(firstEle);
    } else {
      queue.push(firstEle);
    }
  }

  return queue.findIndex((ele) => ele.index === location) + 1;
}
