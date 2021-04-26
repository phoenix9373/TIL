function solution(dartResult) {
  let text = dartResult.replace(/10/g, '+');
  console.log(text);

  let arr = Array.from(text);
  let nums = [];
  let chars = [];
  let symbols = [];

  while (arr.length > 0) {
      // 1. 숫자 추출
      let num = arr.shift();
      if (num === '+') {
          nums.push(10);
      } else {
          nums.push(Number(num));            
      }

      // 2. 문자 추출
      let char = arr.shift();
      chars.push(char);

      // 3. 특수기호 조건
      if (arr[0] === '*' || arr[0] === '#') {
          let symbol = arr.shift();
          symbols.push(symbol);
      } else {
          symbols.push('_');
      }
  }

  for (let i=0; i < 3; i++) {
      let multiple = 1;
      if (chars[i] === 'S') {
          multiple *= 1;
      } else if (chars[i] === 'D') {
          multiple *= 2;
      } else {
          multiple *= 3;
      }

      nums[i] = Math.pow(nums[i], multiple);

      if (symbols[i] === '#') {
          nums[i] *= -1;
      } else if (symbols[i] === '*') {
          nums[i] *= 2;
          if (i !== 0) {
              nums[i - 1] *= 2;
          }
      }
  }

  return nums.reduce((acc, curr) => acc+curr, 0);
}
