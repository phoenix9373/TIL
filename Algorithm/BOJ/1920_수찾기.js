const rl = require("readline").createInterface({ input: process.stdin });
const arr = [];

rl.on("line", (l) => {
  arr.push(l);
}).on("close", () => {
  solution(arr);
});
