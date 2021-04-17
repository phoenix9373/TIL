function calcAvgHeight(data: { [name: string]: Person }): number | null {
  // Calculate average height from received data. If no data, return null.
  if (!data) {
    return null;
  }

  let avgHeight = 0;
  let divide = 0;
  for (const key of data) {
    console.log(key);
    // avgHeight += Number(value.height);
    // divide++;
  }
  return avgHeight / divide;
}

interface Person {
  height: number;
  weight: number;
}

let avgHeight = calcAvgHeight({
  Matt: { height: 174, weight: 69 },
  Jason: { height: 190, weight: 103 },
});
console.log(avgHeight);
