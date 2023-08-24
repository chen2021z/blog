---
title: Sleep Man支持sleep和eat两个方法；支持链式调用
date: 2023/8/22
tags:
 - Sleep Man
categories:
 - 算法
---





<img src="/image-20230405162948770.png" alt="image-20230405162948770"  />

代码设计：由于有sleep功能，函数不能直接在调用时触发；需要初始化一个列表，把函数注册进去；由每个item触发next执行（sleep则异步触发）

![image-20230405163207942](/image-20230405163207942.png)

talk is cheap, show you my code.

```typescript
class LazyMan {
  private name: string;
  private tasks: Function[] = [];

  constructor(name: string) {
    this.name = name;

    //异步执行next
    setTimeout(()=>{
      this.next()
    })
  }

  sleep(second: number) {
    const task = () => {
      console.log(`${this.name}开始睡觉`);
      setTimeout(() => {
        console.log(`${this.name}睡了${second}s`);
        //xxx秒后开始执行下一个
        this.next();
      }, second * 1000);
    };
    this.tasks.push(task)
    return this // 链式调用
  }

  private next() {
    const task = this.tasks.shift();
    if (task) task();
  }

  eat(food: string) {
    const task = () => {
      console.log(`${this.name}吃${food}`);
      //立刻执行下一个任务
      this.next();
    };
    this.tasks.push(task); //推进任务队列，不立即执行

    return this; //链式调用
  }
}

const zhi = new LazyMan("治");
zhi.eat("香蕉").eat("苹果").sleep(2).eat('梨')
```

