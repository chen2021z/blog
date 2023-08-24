---
title: 二分查找
date: 2023/8/3
tags:
 - Binary Search
categories:
 - 算法
---



```typescript
/**
 *  循环(比递归效率更高)
 * @param arr
 * @param target
 * @returns
 */
export function search1(arr: number[], target: number): number {
  if (arr.length === 0) return -1;
  let startIndex = 0;
  let endIndex = arr.length - 1;
  let midIndex: number;
  let midVal: number;

  while (startIndex <= endIndex) {
    midIndex = Math.floor((startIndex + endIndex) / 2);
    midVal = arr[midIndex];

    if (target > midVal) {
      // 往右搜索
      startIndex = midIndex + 1;
    } else if (target < midVal) {
      // 往左搜索
      endIndex = midIndex - 1;
    } else {
      // 找到了
      return midIndex;
    }
  }

  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 9];
// const res = search1(arr,5.4)
// console.log(res);



/**
 * 递归查找
 * @param arr
 * @param target
 * @param startIndex
 * @param endIndex
 */
export function search2(
  arr: number[],
  target: number,
  startIndex = 0,
  endIndex = arr.length - 1,
): number {
  // 结束范围
  if (arr.length === 0) return -1;
  // 如果start和end相遇
  if (startIndex > endIndex) return -1;
  const midIndex = Math.floor((startIndex + endIndex) / 2);
  const midVal = arr[midIndex];

  if (target > midVal) {
    return search2(arr, target, midIndex + 1, endIndex);
  } else if (target < midVal) {
    return search2(arr, target, startIndex, midIndex - 1);
  } else {
    return midIndex;
  }
}
```

