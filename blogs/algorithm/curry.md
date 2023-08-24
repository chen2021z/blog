---
title: 手写一个curry函数，把其他函数柯里化
date: 2023/7/3
tags:
 - Curry
categories:
 - 算法
---



手写一个curry函数，把其他函数柯里化

**函数柯里化（Currying）**是一种将具有多个参数的函数转化为一系列单参数函数的技术。柯里化可以让函数更加灵活、可组合和可复用，因为它使得函数可以部分应用，即只传递其中一部分参数而不是所有参数。

curry 函数里传入的是一个函数，返回的也是一个函数；执行curry 函数，如果参数不够，返回函数，如add(1)/add(1)(2)；最后参数齐了，返回执行结果

```typescript
function curry(fun: Function) {
  //拿到传入函数 形参的个数
  const funArgsLength = fun.length;
  // 积累通过执行传入的参数
  let args: any[] = [];

  function calc(this: any, ...newArgs: any[]) {
    // 积累参数
    args = [...args, ...newArgs];

    if (args.length < funArgsLength) {
      // 参数不够,返回参数
      return calc;
    } else {
      // 参数够了，返回执行结果
      return fun.apply(this, args.slice(0, funArgsLength));
    }
  }

  return calc;
}
```

