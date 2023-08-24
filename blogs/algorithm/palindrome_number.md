---
title: 求输入数字以内的回文数
date: 2023/7/10
tags:
 - Palindrome Number
categories:
 - 算法
---




```typescript
// 求输入数字以内的回文数

/**
 * 方法1：通过反转比较
 * @param num
 */
function getNumbers(num: number): number[] {
  const res: number[] = [];
  if (num < 0) return res;

  for (let i = 0; i < num; i++) {
    const s = i.toString();
    if (s.split("").reverse().join("") === s) {
      res.push(i);
    }
  }

  return res;
}

console.log(getNumbers(300));

// 方法2：双指针字符串头尾比较
function getNumbers2(num: number): number[] {
  const res: number[] = [];
  if (num < 0) return res;

  for (let i = 0; i < num; i++) {
    const s = i.toString();
    let startIndex = 0;
    let endIndex = s.length - 1;
    let flag = true;

    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false;
        break;
      } else {
        // 继续比较
        startIndex++;
        endIndex--;
      }
    }
    if (flag) {
      res.push(i);
    }
  }

  return res;
}

// console.log(getNumbers2(300));


// 方法3：生成反转数 再比较
function getNumbers3(num: number): number[] {
  const res: number[] = [];
  if (num < 0) return res;

  for (let i = 0; i < num; i++) {
    let n = i;
    let reverseNum = 0; //保存反转数

    // 生成翻转数
    while (n > 0) {
      reverseNum = reverseNum * 10 + (n % 10);
      n = Math.floor(n / 10);
    }
    if(i === reverseNum) res.push(i)
  }

  return res;
}
```

