function solution(n, passenger, train) {
  let answer = [];
  let [adjList, visitAdjList] = createAdjList(train); // 인접 리스트, 방문 인접 리스트

  function createAdjList(arrList) {
    let adjList = {};
    let visitAdjList = {};
    arrList.forEach((arr) => {
      let [s, v] = arr;

      if (s in adjList) {
        adjList[s].push(v);
      } else {
        adjList[s] = [v];
      }

      if (v in adjList) {
        adjList[v].push(s);
      } else {
        adjList[v] = [s];
      }
    });
    for (let key in adjList) {
      visitAdjList[key] = Array.from({ length: adjList[key].length }, () => 0);
    }
    return [adjList, visitAdjList];
  }

  function dfs(s, cumsum) {
    if (!visitAdjList[s].includes(0)) {
      answer.push([cumsum, s]);
      return;
    }

    let i = 0;
    for (let nextPoint of adjList[s]) {
      if (visitAdjList[nextPoint][i] === 1) {
        i++;
        continue;
      } else {
        visitAdjList[nextPoint][i] = 1;
        dfs(nextPoint, cumsum + passenger[nextPoint - 1]);
        visitAdjList[nextPoint][i] = 0;
      }
      i++;
    }
  }

  dfs(1, 0);
  answer.sort(function (a, b) {
    return a[0] - b[0];
  });
  answer.sort(function (a, b) {
    return a[1] - b[1];
  });
  let res = answer[answer.length - 1];
  res[0]++;
  res[1]++;
  return res;
}
