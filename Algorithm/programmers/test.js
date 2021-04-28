function test(arr) {
  if (arr.length === 1) {
    return arr[0].map((e) => [e]);
  }

  let result = [];
  arr[0].forEach((k, i) => {
    let t = test(arr.slice(1));
    t = t.map((item) => [k, ...item]);
    result.push(...t);
  });

  return result;
}

const a = test([
  ["a", "b"],
  ["c", "d"],
  ["e", "f"],
]);

console.log(a);
