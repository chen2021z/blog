---
title: 数组反转
date: 2023/8/1
tags:
 - Array Rotate
categories:
 - 算法
---


```typescript
function rotate1(arr: number[], k: number): number[] {
  if (!k || arr.length === 0) return arr;
  const step = Math.abs(k % arr.length);

  for (let i = 0; i < step; i++) {
    const tem = arr.pop();
    if (tem) {
      arr.unshift(tem);
    }
  }

  return arr;
}
// const a1 = rotate1([1, 2, 3, 4, 5], 2);
// console.log(a1);

/**
 * 第二种
 * @param arr
 * @param k
 * @returns
 */
function rotate2(arr: number[], k: number): number[] {
  if (!k || arr.length === 0) return arr;
  const step = Math.abs(k % arr.length);

  const p1 = arr.slice(-step);
  const p2 = arr.slice(0, arr.length - step);
  const p3 = p1.concat(p2);

  return p3;
}

/* 
性能比较
rotate1: 183.006ms
rotate2: 0.875ms
*/
```

