---
title: 将数组中的0移动到末尾，需要保证顺序不变
date: 2023/7/9
tags:
 - Move Zero
categories:
 - 算法
---



```typescript
/**
   * 传统方法 n^2
   * @param arr
   */
  function movezero1(arr: number[]) {
    const len = arr.length;
    let zeroLen = 0;
    for (let i = 0; i < len - zeroLen; i++) {
      if (arr[i] === 0) {
        arr.push(0);
        arr.splice(i, 1); //本身就是O(n)复杂度
        i--;
        zeroLen++;
      }
    }
  }
  let arr = [1, 0, 3, 5, 0, 0, 4];
  // movezero1(arr);
  // console.log(arr);

  /**
   * 双指针优化
   * @param arr
   */
  function movezero2(arr: number[]) {
    let firstZeroIdx = -1; //第一个0元素的下标
    let i: number;
    let len = arr.length;
    for (i = 0; i < len; i++) {
      // 当前元素值为0
      if (arr[i] === 0) {
        // 只在初次赋值
        firstZeroIdx < 0 ? (firstZeroIdx = i) : "";
      }

      // 初次赋值后，指向0后面的第一个不为0元素
      if (firstZeroIdx >= 0 && arr[i] !== 0) {
        // 交换值
        arr[firstZeroIdx] = arr[i];
        arr[i] = 0;

        firstZeroIdx++;
      }
    }
  }
```

