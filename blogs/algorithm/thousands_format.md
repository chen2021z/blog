---
title: 数字千分位添加“，”转为字符串
date: 2023/7/14
tags:
 - Thousands Format
categories:
 - 算法
---




```typescript
// 方法一：数组反转+reduce
  function format1(n: number): string {
    // 只考虑整数
    const str = Math.floor(n).toString();
    let arr = str.split("").reverse();

    return arr.reduce((prev, cur, index) => {
      if (index % 3 === 0 && index !== 0) {
        return cur + "," + prev;
      } else {
        return cur + prev;
      }
    }, "");
  }

  // console.log(format1(123456789));

  // 方法二：字符串分析
  function format2(n: number): string {
    // 只考虑整数
    let str = Math.floor(n).toString();
    let res = "";
    let index; //处理的第几个字符，从后往前
    for (let i = str.length - 1; i >= 0; i--) {
      index = str.length-1 - i; 

      if(index % 3 === 0 && index !== 0){
        res = ',' + res
      }
      res = str[i] + res
    }
    
    return res;
  }

```


