import { Task } from "../types";

const parent = (i: number) => Math.floor((i - 1) / 2);
const leftChild = (i: number) => 2 * i + 1;
const rightChild = (i: number) => 2 * i + 2;

const swap = <T>(heap: T[], i: number, j: number) => {
  [heap[i], heap[j]] = [heap[j], heap[i]];
};

const heapifyUp = <T>(
  heap: T[],
  index: number,
  compare: (a: T, b: T) => number
) => {
  while (index > 0) {
    const parentIndex = parent(index);
    if (compare(heap[index], heap[parentIndex]) < 0) {
      swap(heap, index, parentIndex);
      index = parentIndex;
    } else {
      break;
    }
  }
};

const heapifyDown = <T>(
  heap: T[],
  index: number,
  compare: (a: T, b: T) => number
) => {
  const length = heap.length;
  const element = heap[index];

  while (true) {
    const leftIndex = leftChild(index);
    const rightIndex = rightChild(index);
    let swapIndex: number | null = null;

    if (leftIndex < length && compare(heap[leftIndex], element) < 0) {
      swapIndex = leftIndex;
    }

    if (
      rightIndex < length &&
      compare(
        heap[rightIndex],
        swapIndex === null ? element : heap[swapIndex]
      ) < 0
    ) {
      swapIndex = rightIndex;
    }

    if (swapIndex === null) break;

    swap(heap, index, swapIndex);
    index = swapIndex;
  }
};

export const createPriorityQueue = <T>(compare: (a: T, b: T) => number) => {
  const heap: T[] = [];

  return {
    enqueue: (item: T) => {
      heap.push(item);
      heapifyUp(heap, heap.length - 1, compare);
    },
    dequeue: (): T | undefined => {
      if (heap.length === 0) return undefined;
      const root = heap[0];
      const end = heap.pop();
      if (heap.length > 0 && end !== undefined) {
        heap[0] = end;
        heapifyDown(heap, 0, compare);
      }
      return root;
    },
    size: () => heap.length,
    peek: () => heap[0],
    isEmpty: () => heap.length === 0,
  };
};

export const priorityOrder: { [key: string]: number } = {
  "high": 1,
  "medium": 2,
  "low": 3,
};

export const ascPriorityValues = (a: Task, b: Task) => {
  const aPriorityValue = priorityOrder[a.priority.toLowerCase()] ;
  const bPriorityValue = priorityOrder[b.priority.toLowerCase()] ;

  return aPriorityValue - bPriorityValue;
};

export const dscPriorityValues = (a: Task, b: Task) => {
  const aPriorityValue = priorityOrder[a.priority.toLowerCase()] ;
  const bPriorityValue = priorityOrder[b.priority.toLowerCase()] ;

  return bPriorityValue - aPriorityValue;
};

export const ascDueDateValues = (a: Task, b: Task) => {
  const dateA = new Date(a.dueDate);
  const dateB = new Date(b.dueDate);

  return dateA.getTime() - dateB.getTime();
};

export const dscDueDateValues = (a: Task, b: Task) => {
  const dateA = new Date(a.dueDate);
  const dateB = new Date(b.dueDate);

  return dateB.getTime() - dateA.getTime();
};