---
title: 快速排序
date: 2023/7/11
tags:
 - Quick Sort
categories:
 - 算法
---





```typescript
// 快速排序 splice 会修改原数组
  function quickSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;

    const midIndex = Math.floor(arr.length / 2);
    // 从原数组取出中间值
    const midVal = arr.splice(midIndex, 1)[0];

    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < midVal) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return quickSort(left).concat(midVal, quickSort(right));
  }

  // 快速排序 slice 不会修改原数组
  function quickSort2(arr: number[]): number[] {
    if (arr.length === 0) return arr;

    const midIndex = Math.floor(arr.length / 2);
    // 从原数组取出中间值
    const midVal = arr.slice(midIndex, midIndex + 1)[0];

    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (i !== midIndex) {
        if (arr[i] < midVal) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
    }

    return quickSort2(left).concat(midVal, quickSort2(right));
  }

  const res = [4, 3, 7, 5, 8, 2, 1, 9, 6];

  console.log(quickSort2(res));
```