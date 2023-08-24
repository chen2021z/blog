---
title: 从arr递增数组中找出唯一和为target的两个数，并返回
date: 2023/7/14
tags:
 - Two Numbers Target
categories:
 - 算法
---


```typescript
/**
 * 从arr递增数组中找出唯一和为target的两个数，并返回
 * @param arr
 * @param target
 * @returns
 */
function findNums(arr: number[], target: number): number[] {
  const res: number[] = [];

  if (arr.length === 0) return res;
  let flag = false;

  for (let i = 0; i < arr.length - 1; i++) {
    let n1 = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      let n2 = arr[j];
      if (n1 + n2 === target) {
        res.push(i);
        res.push(j);
        flag = true;
        break;
      }
    }
    if (flag) break;
  }

  return res;
}

const arr = [1, 2, 3, 4, 5];
const res = findNums(arr, 6);
const res2 = findNums2(arr,9)
console.log(res2);

// console.log(res);

/**
 * 双指针
 * @param arr
 * @param target
 */
function findNums2(arr: number[], target: number): number[] {
  const res: number[] = [];
  if (arr.length === 0) return res;
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    if (arr[start] + arr[end] > target) {
      // 右指针左移
      end--;
    } else if (arr[start] + arr[end] < target) {
      // 左指针右移
      start++;
    } else {
      // 正解
      res.push(start);
      res.push(end);
      break;
    }
  }
  return res;
}

```

