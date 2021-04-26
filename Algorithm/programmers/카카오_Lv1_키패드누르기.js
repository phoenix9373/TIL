function solution(numbers, hand) {
  const keypad = {
    0: [3, 1],
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
  };
  let left = [3, 0];
  let right = [3, 2];

  function getCoor(leftCoor, rightCoor, move) {
    if ("147".includes(move)) return [keypad[move], rightCoor, "L"];
    if ("369".includes(move)) return [leftCoor, keypad[move], "R"];

    let leftDist = leftCoor.reduce(
      (result, val, i) => result + Math.abs(val - keypad[move][i]),
      0
    );
    let rightDist = rightCoor.reduce(
      (result, val, i) => result + Math.abs(val - keypad[move][i]),
      0
    );

    if (leftDist === rightDist) {
      if (hand === "left") {
        return [keypad[move], rightCoor, "L"];
      } else {
        return [leftCoor, keypad[move], "R"];
      }
    }

    let res =
      leftDist > rightDist
        ? [leftCoor, keypad[move], "R"]
        : [keypad[move], rightCoor, "L"];

    return res;
  }

  let answer = "";

  for (let i of numbers) {
    let tmp = getCoor(left, right, i);
    answer += tmp[2];
    left = tmp[0];
    right = tmp[1];
  }

  return answer;
}
