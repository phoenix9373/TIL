// ============================================================
// 힙 : 자료구조
// ============================================================
// 시간 복잡도 : peek O(1), insert O(logn), remove O(logn)
// ============================================================
// Max Heap : 부모 노드는 항상 자식 노드보다 크거나 같다.
// Min Heap : 부모 노드는 항상 자식 노드보다 작다.
// ============================================================
// 부모 노드는 left, right 총 최대 2개의 자식 노드를 갖는다.
// 하단을 제외한 상단의 모든 레벨을 채워져있어야한다.
// 이진 트리로 구현한다.
// ============================================================
// left = parent * 2 + 1
// right = parent * 2 + 2
// parent = (left or right - 1) / 2
// ============================================================
// 언제 이용하는가? -> 주로 최소 | 최대 값을 O(1)의 시간 복잡도로 얻어내기 위해 사용한다.

class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0]; // 항상 최상위 노드가 peek된다.

  // 삽입: O(logN)
  insert = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp();
  };

  // 방금 들어온 값과 부모의 값을 비교하면서 끌어올리는 과정
  // 마지막 인덱스에 값을 삽입하고 끌어올리기 때문에 Up이라는 단어가 들어감.
  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  };

  // 제거: O(logN)
  remove = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    // 특수 경우, 0 또는 1일 때
    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop(); // 가장 마지막에 있는 값을 루트로 가져온다. 길이가 줄어듦.
      this.heapifyDown();
    }

    return rootNode;
  };

  // 아래쪽 정리
  heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      // 왼쪽, 오른쪽 중 더 작은 노드 찾음.
      // 오른쪽이 있으면 비교하고, 없으면 그냥 왼쪽에 할당.
      const smallerChildIndex =
        rightChildIndex < count &&
        this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }
  };
}

class PriorityQueue extends Heap {
  constructor(props) {
    super(props);
  }

  enqueue = (priority, value) => this.insert(priority, value);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
}
