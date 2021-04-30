function solution(info, query) {
  info = info.map((i) => i.split(" "));
  let conditions = info.map((i) => i.slice(0, 4).map((j) => [j, "-"]));
  let nums = info.map((i) => Number(i[i.length - 1]));
  let q = query
    .map((item) => item.split(" ").filter((word) => word !== "and"))
    .map((item) => [item.slice(0, 4).join(""), Number(item.slice(4))]);

  function getCd(arr) {
    if (arr.length === 1) {
      return arr[0].map((e) => [e]);
    }

    let result = [];
    arr[0].forEach((k, i) => {
      let newArr = getCd(arr.slice(1));
      newArr = newArr.map((item) => [k, ...item]);
      result.push(...newArr);
    });

    return result;
  }

  let obj = {};
  for (let i = 0; i < info.length; i++) {
    let cases = getCd(conditions[i]).map((c) => c.join(""));
    cases.forEach((key) => {
      obj[key] = obj[key] ? [...obj[key], nums[i]] : [nums[i]];
    });
  }

  for (let key in obj) {
    obj[key].sort((a, b) => {
      return a - b;
    });
  }

  let ans = [];
  for (let k of q) {
    let cnt = 0;
    if (obj[k[0]]) {
      cnt = obj[k[0]].length;
      for (let i = 0; i < obj[k[0]].length; i++) {
        if (obj[k[0]][i] < k) {
          cnt--;
        } else {
          break;
        }
      }
      ans.push(cnt);
    }
  }
  return ans;
}
