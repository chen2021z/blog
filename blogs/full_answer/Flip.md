---
title: Flip原理及实现
date: 2023/9/13
tags:
 - Flip
categories:
 - Flip
---



### Flip是什么？

Flip 并不是一个插件或者一个库，仅仅是一个动画实现的思路。例如 `Vue`的内置组件 `transitionGroup` 就有用到，[Vue文档链接](https://cn.vuejs.org/api/built-in-components.html#transitiongroup)

`FLIP`代表`First`和`Last`以及`Invert`还有`Play`四个单词的组合。

- `First`
   元素的起始位置或者大小,可以使用 `getBoundingClientRect()`这个 `API`来处理
- `Last`
   从字面理解，就是元素的结束状态啦，也就是动画让元素停止的状态了
- `Invert`
   计算元素第一个位置（`First`）和最后一个位置（`Last`）之间的位置变化, 让元素进行移动（通过 `transform`来改变元素的位置），从而创建它位于 **初始位置** 的一个错觉,  然后再添加 `transition`效果，自然而然的，过渡效果就来了
- `Play` 万事俱备，只要让动画动起来就好了

![image-20230913204931592](/image-20230913204931592.png)

### Flip案例效果

在Vue中通过`transitionGroup`组件可以轻松实现，这里通过原始案例更容易明白原理。

![20230913203739_rec_](/20230913203739_rec_.gif)



### 前置知识

#### [getBoundingClientRect](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FElement%2FgetBoundingClientRect)

通过`dom.getBoundingClientRect()`，可以得到某个元素在屏幕上的矩形区域

```js
const rect = dom.getBoundingClientRect(); // 获取矩形区域
rect.left; // 获取矩形区域的left值
rect.top; // 获取矩形区域的top值
```

#### [transform](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Ftransform)

transform是css3提供的属性，含义为变形或变换

css3提供了多种变换方式，包括平移、旋转、倾斜、缩放，还包括更加具有通用性的矩阵变换

**所有变换，均不会影响真实布局位置，只是影响最终的视觉效果**

#### [animate api](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2Fweb%2Fapi%2Felement%2Fanimate)

```js
dom.animate(
  [
    { /* 起始css属性 */ },
    { /* 结束css属性 */ },
  ],
  {
    duration: 800, // 完成动画的时间
  }
);
```

#### children

通过dom.children拿到的是HTMLColection，子项是Element元素（只包含HTML元素），通过childNodes拿到的是NodeList，子项是Node元素（包含text、换行、注释节点）



### 实现步骤

```js
// ① Frist
record(container); // 记录容器中每个子元素的起始坐标
// 改变元素顺序
change();
// ② Last + ③ Invert + ④ Play
move(container); // 让元素真正实现移动
```

### 案例完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    ul {
      width: 300px;
    }

    ul li {
      list-style: none;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: aquamarine;
      border-radius: 15px;
      margin-bottom: 10px;
      user-select: none;
    }
  </style>
</head>

<body>
  <button class="btn">反转</button>
  <ul class="container">
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
    <li>item5</li>
    <li>item6</li>
  </ul>

  <script>
    // 使用示例:
    const container = document.querySelector('.container')
    const btn = document.querySelector('.btn')

    btn.onclick = function () {
      record(container)
      change()
      move(container)
    }

    function change() {
      // 反转元素列表
      let len = container.children.length
      let index = 0

      while (index < len - 1) {
        let node = container.children[index]
        let insertNode = container.children[len - 1]
        container.insertBefore(insertNode, node)
        index++
      }
    }

    function record(container) {
      for (let i = 0, len = container.children.length; i < len; i++) {
        const dom = container.children[i]
        const rect = dom.getBoundingClientRect()
        dom.startX = rect.left
        dom.startY = rect.top
      }
    }

    function move(container) {
      for (let i = 0, len = container.children.length; i < len; i++) {
        const dom = container.children[i]
        const rect = dom.getBoundingClientRect()
        const curX = rect.left, curY = rect.top
        dom.animate([
          { transform: `translate(${dom.startX - curX}px, ${dom.startY - curY}px)` },
          { transform: `translate(0px, 0px)` }
        ], { duration: 600 })
      }
    }

  </script>
</body>

</html>
```

