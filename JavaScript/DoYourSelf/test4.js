class Snapshot {
  constructor(array) {
    let getArr = function (tmpArray) {
      let arr = [...array];
      return arr;
    };
    let copyArr = [...getArr(array)];
    this.array = array;
    this.copyArr = copyArr;
  }

  restore() {
    return this.copyArr;
  }
}

var array = [1, 2];
var snap = new Snapshot(array);
array[0] = 3;
array = snap.restore();
console.log(array.join()); //It should log "1,2"
array.push(4);
array = snap.restore();
console.log(array.join()); //It should log "1,2"
