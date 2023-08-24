---
title: 用对象和链表模拟队列
date: 2023/8/1
tags:
 - Queue
categories:
 - 算法
---




```typescript
interface Item {
  [prop: number]: number;
}

// 用对象实现队列
export class Queue1 {
  private count: number; //记录数量，计算长度
  private lowestCount: number; //记录第一个元素位置
  private items: Item; //存储

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  // 尾部进
  enquene(n: number) {
    this.items[this.count] = n;
    this.count++;
  }

  // 头部出
  dequene() {
    if (this.getlen() === 0) return undefined;

    const res = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return res;
  }

  getlen() {
    return this.count - this.lowestCount;
  }

  // 查看队头
  peek() {
    return this.items[this.lowestCount];
  }
}

let q1 = new Queue1();
q1.enquene(1);
q1.enquene(3);
q1.enquene(5);
q1.dequene();
q1.dequene();
// console.log(q1);



interface Item2 {
  value: number;
  next: Item2 | null;
}
// 用链表模拟
export class Queue2 {
  private count: number;
  // 头部节点
  private head: Item2 | null;
  // 尾部节点
  private tail: Item2 | null;

  constructor() {
    this.count = 0;
    this.head = null;
    this.tail = null;
  }

  enqueue(n: number) {
    // 创建新node
    const newNode: Item2 = {
      value: n,
      next: null,
    };
    // 处理head,如果没有元素
    if (!this.head) {
      this.head = newNode;
    }
    // 处理tail
    const tailNode = this.tail;
    if (tailNode) {
      tailNode.next = newNode;
    }
    this.tail = newNode;
    this.count++;
  }

  dequeue(): number | null {
    if (this.head == null) return null;

    // 取值
    const value = this.head.value;
    this.head = this.head.next;
    this.count--;
    return value;
  }

  getlen() {
    return this.count;
  }
}
const q2 = new Queue2();
q2.enqueue(2);
q2.enqueue(4);
q2.enqueue(6);
q2.dequeue()
q2.dequeue()
console.log(q2);

```

