function solution(new_id) {
  // 1단계
  new_id = new_id.toLowerCase();
  let removedStr = "";
  let preChar = "";
  // 2단계, 3단계
  for (let i = 0; i < new_id.length; i++) {
    let c = new_id.charAt(i);
    let code = c.charCodeAt(0);
    let check = false;

    if (preChar === "." && c === ".") continue;

    if (code >= 97 && code <= 122) {
      removedStr += c;
      check = true;
    }
    if (code === 45 || code === 95 || code === 46) {
      removedStr += c;
      check = true;
    }
    if (code >= 48 && code <= 57) {
      removedStr += c;
      check = true;
    }
    if (check) preChar = c;
  }
  console.log(removedStr);
  if (removedStr.length === 0) return "a".repeat(new_id.length);
  removedStr = removePoint(removedStr);
  removedStr =
    removedStr.length >= 16 ? removePoint(removedStr.slice(0, 15)) : removedStr;
  removedStr =
    removedStr.length <= 2
      ? removedStr +
        removedStr.charAt(removedStr.length - 1).repeat(3 - removedStr.length)
      : removedStr;
  function removePoint(str) {
    while (str[0] === "." || str[str.length - 1] === ".") {
      if (str[0] === ".") str = str.slice(1);
      if (str[str.length - 1] === ".") str = str.slice(0, str.length - 1);
      if (str.length === 0) return "a".repeat(new_id.length);
    }

    return str;
  }

  return removedStr;
}

const ans = solution("-_./._-");
console.log(ans);

// console.log("a".charCodeAt(0));
// console.log("z".charCodeAt(0));
// console.log("-".charCodeAt(0));
// console.log("_".charCodeAt(0));
// console.log(".".charCodeAt(0));
// console.log("0".charCodeAt(0));
// console.log("9".charCodeAt(0));
