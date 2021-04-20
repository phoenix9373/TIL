function solution(bridge_length, weight, truck_weights) {
  let timer = [];
  let time = 1;
  let bridge = [];
  let sum = (arr) => {
    return arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  };

  do {
    ++time;
    if (truck_weights[0] + sum(bridge) <= weight) {
      bridge.push(truck_weights.splice(0, 1)[0]);
      timer.push(bridge_length);
    }
    for (let idx = 0; idx < bridge.length; idx++) {
      timer[idx] = timer[idx] - 1;
    }
    for (let idx = 0; idx < bridge.length; idx++) {
      if (timer[idx] === 0) {
        timer.splice(0, 1);
        bridge.splice(0, 1);
      }
    }
  } while (bridge.length != 0 || truck_weights.length != 0);
  return time;
}

const ans = solution(100, 100, [10]);
console.log(ans);

// 다른 사람 풀이
function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let queue = [[0, 0]];
  let weightOnBridge = 0;

  while (queue.length > 0 || truck_weights.length > 0) {
    if (queue[0][1] === time) weightOnBridge -= queue.shift()[0];

    if (weightOnBridge + truck_weights[0] <= weight) {
      weightOnBridge += truck_weights[0];
      queue.push([truck_weights.shift(), time + bridge_length]);
    } else {
      if (queue[0]) time = queue[0][1] - 1;
    }

    time++;
  }

  return time;
}

// 로직 다시 생각해보기.
function solution3(bridge_length, weight, truck_weights) {
  // 다리 위에 있는 차.
  let bridge = [];
  // 무게와 시간 측정
  let time = 0;
  let totalWeight = 0;

  while (truck_weights.length !== 0) {
    // 시간이 하나 가고,
    time++;
    // 가장 먼저 맨 앞에 있는 차가 나가는 시간인지 체크하고, 전체 무게에서 제거.
    if (bridge.length >= 1 && bridge[0][1] === time) {
      let lossWeight = bridge.splice(0, 1)[0][0];
      totalWeight -= lossWeight;
    }
    // sum을 계산해서, 들어오는 값 구하자.
    if (totalWeight + truck_weights[0] <= weight) {
      totalWeight += truck_weights[0];
      bridge.push([truck_weights[0], time + bridge_length]);
      truck_weights = truck_weights.slice(1);
    } else {
      time = bridge[0][1] - 1;
    }
  }
  return time + bridge_length;
}

const ans3 = solution3(2, 10, [7, 4, 5, 6]);
console.log(ans3);
