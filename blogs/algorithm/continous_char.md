---
title: 求连续最长的字符及长度
date: 2023/7/2
tags:
 - Continous Char
categories:
 - 算法
---


```typescript
// 求连续最长的字符及长度

  interface Ichar {
    char: string;
    length: number;
  }

  function getChar(str: string): Ichar {
    const res = {
      char: "",
      length: 0,
    };

    if (str.length === 0) return res;
    let temLength = 0; //记录当前字符连续最长的长度

    for (let i = 0; i < str.length; i++) {
      temLength = 0;

      for (let j = i; j < str.length; j++) {
        if (str[i] === str[j]) {
          temLength++;
        }

        // 不相等时或到头时都得判断
        if (str[i] !== str[j] || j === str.length - 1) {
          // 不相等时判断最大值
          if (res.length < temLength) {
            res.char = str[i];
            res.length = temLength;
          }

          if (i < str.length - 1) {
            i = j - 1; //跳步
          }

          break;
        }
      }
    }

    return res;
  }

  let res = getChar("aabbbcdddd");
  // console.log(res);

  // 优化 双指针j i 其中j不动，i动，不相等时j=i
  function getChar2(str: string): Ichar {
    const res = {
      char: "",
      length: 0,
    };

    if (str.length === 0) return res;
    let temLength = 0; //记录当前字符连续最长的长度

    for (let i = 0, j = 0; i < str.length; i++) {
      if (str[i] === str[j]) {
        temLength++;
      } 
      // 不相等时或到头时都得判断
      if(str[i] !== str[j] || i === str.length - 1){
        if (res.length < temLength) {
          res.char = str[j];
          res.length = temLength;
        }

        j = i;
        temLength = 1;
      }
    }

    return res;
  }

  let res2 = getChar2("aabbbcdddd");
  console.log(res2);
```

