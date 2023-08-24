---
title: 手写Call & Apply
date: 2023/8/21
tags:
 - Call & Apply
categories:
 - 算法
---


bind 返回一个新函数（不执行），call 和 apply 会立即执行函数

分析：如何在函数执行时绑定this

const obj = { x:11, fun(){ this.x } }，执行obj.fun()，此时fun内部的this就指向obj，可借此实现函数绑定this

fun.call(null, ...args)，call 的第一个值如果为null或undefined，fun的this指向window，如果是值类型则指向对应构造函数生成的对象，如Number(100), String('abc')

```typescript
// @ts-ignore
  Function.prototype.myCall = function (context: any, ...args: any[]) {
    if (context == null) context = globalThis;
    if (typeof context !== "object") context = new Object(context); // 如果是值类型

    // 生成唯一的属性 避免覆盖
    const funKey = Symbol();
    context[funKey] = this; //this就是当前调用myCall的函数
    const res = context[funKey](...args);

    // 删除生成的key
    delete context[funKey];

    return res;
  };

  function fun(this: any, a: number, b: number, c: number) {
    console.log(this.x, a, b, c);
  }

  // @ts-ignore
  fun.myCall({ x: 100 }, 10, 20, 30);
```

```typescript
//apply 与上面类似


Function.prototype.myApply = function (context: any, args: any[] = [])

//其余与上面xiagn'togn
```

