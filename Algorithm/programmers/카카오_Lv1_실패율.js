function solution(N, stages) {
    let arr = [];
    for (let i=0; i < N + 1; i++) {
        arr.push([i, 0]);
    }

    for (let stage of stages) {
        if (stage > N) continue;
        arr[stage][1]++;
    }

    let L = stages.length;
    for (let i=1; i < N + 1; i++) {
        let tmp = arr[i][1];
        arr[i][1] = arr[i][1] / L;
        L = L - tmp;
    }

    arr.splice(0, 1);

    arr.sort(function(a, b) {
        if (b[1] === a[1]) {
            return a[0] - b[0];
        } else {
            return b[1] - a[1];
        }
    })

    let answer = [];
    for (let k of arr) {
        answer.push(k[0]);
    }

    return answer;
}

// 다른 사람의 풀이1