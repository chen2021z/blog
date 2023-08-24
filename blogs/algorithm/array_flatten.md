---
title: 数组扁平化
date: 2023/7/1
tags:
 - Array Flatten
categories:
 - 算法
---



```typescript
// 数组深度扁平化，使用 push
function flattenDeep1(arr: any[]): any[] {
    const res: any[] = []

    arr.forEach(item => {
        if (Array.isArray(item)) {
            const flatItem = flattenDeep1(item) // 递归
            flatItem.forEach(n => res.push(n))
        } else {
            res.push(item)
        }
    })

    return res
}
// 数组深度扁平化，使用 concat
function flatenDeep2(arr: any[]): any[] {
    // 先判断是否已经拍平
    const isDeep = arr.some((item) => item instanceof Array);

    if (!isDeep) {
      return arr;
    }

    const res = [].concat(...arr);
    return flatenDeep2(res);
  }

// 如果结果都是string 或 number，可以使用toString
function flatenDeep3(arr: any[]){
    return arr.toString().split(',')
}
```

