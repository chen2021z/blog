---
title: 斐波那契
date: 2023/7/6
tags:
 - Fabonacci
categories:
 - 算法
---



```typescript
/**
 * 特别慢 时间复杂度为2的n次方
 * @param n
 * @returns
 */
function fabonacci(n: number): number {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fabonacci(n - 1) + fabonacci(n - 2);
}

// console.log(fabonacci(100));

// 优化后的fabonacci 循环 时间复杂度为n
function fabonacci2(n: number): number {
  if (n === 1 || n === 2) {
    return 1;
  }
  let prev = 1; // 前一个
  let next = 1; // 后一个
  let sum = 0;
  for (let i = 3; i <= n; i++) {
    sum = prev + next;
    prev = next;
    next = sum;
  }
  return next;
}
```

