---
title: 自定义函数实现new
date: 2023/7/4
tags:
 - Custom New
categories:
 - 算法
---





```typescript
function customNew<T>(calssFun: Function, ...args: any[]): T {
  const obj = Object.create(calssFun.prototype);
  // calssFun.apply(obj, args);
  // return obj; 
  //使用反射
  return Reflect.construct(calssFun, args, obj.constructor);
}


class Foo{
  name:string
  constructor(name:string){
    this.name = name
  }
  getName():string{ 
    return this.name
  }
}


const foo = customNew<Foo>(Foo, '治')
console.log(foo);
```
