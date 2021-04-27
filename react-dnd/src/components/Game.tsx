let knightPosition: number[] = [1, 7];
let observer: any = null;

function emitChange(): void {
  observer(knightPosition); // observer 함수를 실행. observe와 다름.
  // observer 함수는 나이트의 포지션을 변경함.
}

export function observe(o: any): void {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX: number, toY: number): void {
  knightPosition = [toX, toY];
  emitChange();
}

export function canMoveKnight(toX: number, toY: number): boolean {
  const [x, y]: number[] = knightPosition;
  const dx: number = toX - x;
  const dy: number = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}
