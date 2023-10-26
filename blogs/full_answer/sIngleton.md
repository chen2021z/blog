---
title: JS实现单例模式
date: 2023/10/26
tags:
 - singleton
categories:
 - 设计模式
---

# 

## 介绍

> 单例模式：限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问它的全局访问点。

单例模式是创建型设计模式的一种。针对全局仅需一个对象的场景，如线程池、全局缓存、window 对象等。

## 特点

1. 类只有一个实例
2. 全局可访问该实例
3. 自行实例化（主动实例化）
4. 可推迟初始化，即延迟执行（与静态类/对象的区别）



## 需求

希望通过一个工具函数 singleton()，将我们普通的构造函数进行改造，返回一个新构造函数，新构造函数具备单例模式的特点。



## 实现

普通的Normal构造函数

```js
class Normal {
  constructor() {
    console.log("this is a Normal single");
  }
}
```

```js
import { Normal } from "./Normal.js";

const n1 = new Normal()
const n2 = new Normal() // 打印两句"this is a Normal single"
console.log(n1 === n2)  // false
```

### 简单改造

工具函数singleton

```js
export function singleton(className) {
  let instance;
  return class {
    constructor() {
      if (!instance) {
        instance = new className();
      }
      return instance;
    }
  };
}
```

通过singleton进行简单改造，如已存在实例，则返回已创造过的实例

```js
import { singleton } from "./singleton.js";

class Normal {
  constructor() {
    console.log("this is a Normal single");
  }
}

const newNormal = singleton(Normal);

export { newNormal as Normal };
```

再次测试

```js
import { Normal } from "./Normal.js";

const n1 = new Normal()
const n2 = new Normal() // 打印一句"this is a Normal single"
console.log(n1 === n2)  // true
```

### 存在问题

此时我们n1/n2的原型对象并非Normal.prototype，如果我们再其原型上绑定方法，对应实例找不到对应方法

```js
Normal.prototype.play = function(){
  console.log('play');
}
n1.play()  // TypeError: n1.play is not a function
```

此时应该使singleton函数返回代理Proxy，而不是一个新的class！

### 最佳实践

> Talk is cheap, show you my code.

```js
export function singleton(className) {
  let instance;
  return new Proxy(className, {
    // handler.construct() 方法用于拦截 new 操作符
    construct(target, argumentsList) {
      if (!instance) {
        instance = new target(argumentsList);
      }
      return instance;
    },
  });
}
```

```js
import { singleton } from "./singleton.js";

class Normal {
  constructor() {
    console.log("this is a Normal single");
  }
}

const newNormal = singleton(Normal);

export { newNormal as Normal };
```

```js
import { Normal } from "./Normal.js";

const n1 = new Normal()  // this is a Normal single
const n2 = new Normal()

Normal.prototype.play = function(){
  console.log('play');
}
n1.play() // play
```



## 参考

### [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct)



### 



