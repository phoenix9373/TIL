function solution(expression) {
  // 우선순위 조합 : 6개
  // 순서 조합 : 연산자 수!
  const nums = expression.match(/[\d]{1,}/g).map((num) => Number(num));
  const opers = expression.match(/[^\d]/g);

  // 우선순위
  const priorCase = [
    ["-", "+", "*"],
    ["-", "*", "+"],
    ["+", "-", "*"],
    ["+", "*", "-"],
    ["*", "+", "-"],
    ["*", "-", "+"],
  ];

  let ans = 0;
  for (let prior of priorCase) {
    let copyNums = [...nums];
    let copyOpers = [...opers];
    for (let o of prior) {
      for (let i = 0; i < copyOpers.length; i++) {
        if (copyOpers[i] === o) {
          function solution(expression) {
            // 우선순위 조합 : 6개
            // 순서 조합 : 연산자 수!
            const nums = expression
              .match(/[\d]{1,}/g)
              .map((num) => Number(num));
            const opers = expression.match(/[^\d]/g);

            // 우선순위
            const priorCase = [
              ["-", "+", "*"],
              ["-", "*", "+"],
              ["+", "-", "*"],
              ["+", "*", "-"],
              ["*", "+", "-"],
              ["*", "-", "+"],
            ];

            let ans = 0;
            for (let prior of priorCase) {
              let copyNums = [...nums];
              let copyOpers = [...opers];
              for (let o of prior) {
                for (let i = 0; i < copyOpers.length; i++) {
                  if (copyOpers[i] === o) {
                    copyNums[i + 1] = eval(
                      `${copyNums[i]}${copyOpers[i]}${copyNums[i + 1]}`
                    );
                    copyNums[i] = "x";
                  }
                }
                copyNums = copyNums.filter((num) => num !== "x");
                copyOpers = copyOpers.filter((oper) => oper !== o);
              }
              if (ans < Math.abs(copyNums[0])) ans = Math.abs(copyNums[0]);
            }
            return ans;
          }
          copyNums[i + 1] = eval(
            `${copyNums[i]}${copyOpers[i]}${copyNums[i + 1]}`
          );
          copyNums[i] = "x";
        }
      }
      copyNums = copyNums.filter((num) => num !== "x");
      copyOpers = copyOpers.filter((oper) => oper !== o);
    }
    if (ans < Math.abs(copyNums[0])) ans = Math.abs(copyNums[0]);
  }
  return ans;
}

// 다른 사람의 풀이
const solution = (expression) => {
  const numbers = expression.split(/[^0-9]/).map((v) => Number(v));
  const operators = expression.split(/[0-9]/).filter((v) => v);

  const formula = getFormula(numbers, operators);

  const cases = [
    ["*", "+", "-"],
    ["*", "-", "+"],
    ["+", "*", "-"],
    ["+", "-", "*"],
    ["-", "+", "*"],
    ["-", "*", "+"],
  ];

  return Math.max(
    ...cases.map((operators) => {
      let result = formula.slice();
      operators.forEach((operator) => {
        result = computeByTargetOperator(result, operator);
      });

      return Math.abs(...result);
    })
  );
};

const getFormula = (numbers, operators) => {
  const formula = [];

  numbers.forEach((number, i) => {
    formula.push(number);

    if (operators[i]) {
      formula.push(operators[i]);
    }
  });

  return formula;
};

const computeByTargetOperator = (formula, targetOperator) => {
  const computation = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
  };

  const stack = [];
  for (let i = 0; i < formula.length; i += 1) {
    const target = formula[i];
    if (target === targetOperator) {
      const previousValue = stack.pop();
      const nextValue = formula[i + 1];

      const result = computation[targetOperator](previousValue, nextValue);

      stack.push(result);
      i += 1;
      continue;
    }

    stack.push(target);
  }

  return stack;
};
