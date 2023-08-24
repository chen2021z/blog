---
title: 青蛙跳台阶 
date: 2023/7/8
tags:
 - Jump Floor
categories:
 - 算法
---



```typescript
// 青蛙跳台阶 
function jumpFloor(number: number) {
  if(number === 1) return 1
  if(number === 2) return 2

  let prev = 1; // 前一个
  let next = 2; // 后一个
  let sum = 0;
  for (let i = 3; i <= number; i++){
    sum = prev + next;
    prev = next;
    next = sum;
  }
  return sum;
}
```

