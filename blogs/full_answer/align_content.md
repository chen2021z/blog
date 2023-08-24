---
title: align-content 和 justify-content和align-items的区别？
date: 2022/12/21
tags:
 - 样式布局
categories:
 - flex
---


`align-content`、`justify-content`和`align-items`是Flex布局中用于对齐内容的属性，它们分别控制项目在交叉轴和主轴上的对齐方式。

区别如下：

- `align-content`：用于设置多行项目在交叉轴上的对齐方式。它可以影响整个Flex容器内的项目布局。适用于具有多行的Flex容器。
- `justify-content`：用于设置单行项目在主轴上的对齐方式。它影响项目在单行上的布局。适用于只有一行的Flex容器。
- `align-items`：用于设置单个项目在交叉轴上的对齐方式。它影响项目在交叉轴上的布局，并优先级高于`align-content`。适用于每个项目的个体对齐。

具体解释如下：

- `align-content`：多行项目的对齐方式，可选值包括：
  - `flex-start`：多行项目在交叉轴起始位置对齐。
  - `flex-end`：多行项目在交叉轴末尾位置对齐。
  - `center`：多行项目在交叉轴中心位置对齐。
  - `space-between`：多行项目均匀分布在交叉轴上，首尾项目与容器边界无间隔。
  - `space-around`：多行项目均匀分布在交叉轴上，项目之间以及首尾项目与容器边界之间均有间隔。
  - `stretch`（默认值）：多行项目被拉伸以填充整个交叉轴的空间。
- `justify-content`：单行项目的对齐方式，可选值包括：
  - `flex-start`（默认值）：单行项目在主轴起始位置对齐。
  - `flex-end`：单行项目在主轴末尾位置对齐。
  - `center`：单行项目在主轴中心位置对齐。
  - `space-between`：单行项目均匀分布在主轴上，首尾项目与容器边界无间隔。
  - `space-around`：单行项目均匀分布在主轴上，项目之间以及首尾项目与容器边界之间均有间隔。
  - `space-evenly`：单行项目均匀分布在主轴上，包括首尾项目与容器边界之间的间隔。
- `align-items`：单个项目的对齐方式，可选值包括：
  - `flex-start`：项目在交叉轴起始位置对齐。
  - `flex-end`：项目在交叉轴末尾位置对齐。
  - `center`：项目在交叉轴中心位置对齐。
  - `baseline`：项目在交叉轴基线上对齐。
  - `stretch`（默认值）：项目被拉伸以填充交叉轴的空间。

总结而言，`align-content`用于控制多行项目在交叉轴上的对齐方式，`justify-content`用于控制单行项目在主轴上的对齐方式，而`align-items`用于控制单个项目在交叉轴上的对齐方式。