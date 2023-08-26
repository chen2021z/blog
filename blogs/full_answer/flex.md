---
title: flex实现九宫格
date: 2022/12/21
tags:
 - 样式布局
categories:
 - flex
---


```css
.container {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
}

.item {
  flex: 1 0 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
</div>
```

 其中 flex: 1 0 33.33%;表示什么?

`lex: 1 0 33.33%;`是一个Flex项目的缩写属性，用于设置Flex项目的伸缩能力、基准值和初始大小。

具体解释如下：

- `flex-grow`: 1表示项目可以根据剩余空间进行伸展，并占据可用空间的比例。在这个示例中，所有的项目都将按照相同比例（1:1:1）来拉伸(默认为0，即如果存在剩余空间，也不放大。)
- `flex-shrink`: 0表示项目在空间不足时不会缩小。在这个示例中，项目不会缩小，以保持每个项目的原始大小。(默认为1，即如果空间不足，该项目将缩小。)
- `flex-basis`: 33.33% 表示项目的初始大小为33.33%的宽度。在这个示例中，每个项目的初始宽度为父容器宽度的1/3。

综合起来，`flex: 1 0 33.33%;`表示该Flex项目可以根据剩余空间进行伸展（比例为1），但不会缩小（比例为0），同时初始宽度为父容器宽度的1/3。