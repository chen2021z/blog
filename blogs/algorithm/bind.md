---
title: 手写bind
date: 2023/8/20
tags:
 - Bind
categories:
 - 算法
---


手写bind函数：返回一个新函数，但不执行；可以绑定this和**部分参数**；如果是箭头函数，无法改变this，只能改变参数

```typescript
// @ts-ignore
Function.prototype.myBind = function(context:any, ...bindArgs){
  // this为调用myBind的函数,fun
  // context为需要进行绑定的上下文对象
  // bindArgs为myBind()里传入的参数
  const self = this

  return function(...args: any[]){
    return self.apply(context, bindArgs.concat(args))
  }
}

function fun(this:any, a:number, b:number, c:number){
  console.log(this, a, b, c);
}

// @ts-ignore
const f1 = fun.myBind({x:100}, 10, 20)
f1(40)
```


