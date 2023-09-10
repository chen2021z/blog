---
title: 下拉菜单的过渡实现
date: 2023/9/10
tags:
 - transition
categories:
 - js
---





在当我们设置一个元素高度有0到100px的过渡效果很简单，设置元素起始高度为0，某个状态高度为100px，同时为该元素设置transform属性即可

但某些情况元素的高度是**不固定**且由子元素高度撑开，如果我们设置过渡元素height:auto; 就会发现，过渡效果并不会生效，因为auto不是一个有效的数值！

主要的解决方案有以下两种：



### 方法一：由JS计算高度，再设置样式

分为两步，先获取元素得真实高度，再将元素高度设置为0（页面需要重绘），再设置具体高度和过渡效果

```html
<body>
  <div class="text-select">
    <input type="text" class="input">
    <div class="select">
      <span>11111111111</span>
      <span>11111111111</span>
		...
    </div>
  </div>

  <script>
    const input = document.querySelector('.input')
    const select = document.querySelector('.select')

    input.onfocus = function(){
      select.style.transition = 'none'
      select.style.height = 'auto'
      const height = select.offsetHeight // 获取元素真实高度
      select.style.height = 0
      select.offsetHeight  // 读取layout属性，强制页面回流reflow，使页面重新渲染
      select.style.transition = '1s'
      select.style.height = height + 'px' // 重新设置高度
    }

    input.onblur = function(){
      select.style.height = 0
    }
  </script>
</body>
```

> 效果如下：

![20230910094051_rec_](/20230910094051_rec_.gif)



### 方法二：使用transform属性

通过Y轴旋转实现，在起始状态设置   transform: scaleY(0); 触发状态设置transform: scaleY(1); 结合transition属性即可

效果如下，其视觉效果与方法一不同，自行选择使用

![20230910095655_rec_](/20230910095655_rec_.gif)

### 完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .text-select {
      width: 300px;
      margin: 0 auto;
    }

    .text-select .input {
      border: none;
      outline: none;
      box-sizing: border-box;
      border: 1px solid;
      width: 300px;
      height: 30px;
      margin-bottom: -1px;
    }
    span {
      width: 100%;
    }

    .text-select .select {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid;
      border-top: none;
      overflow: hidden;
      transition: 1s;
      height: auto;
      
      /* transform-origin: top; 设置Y轴位置 */
      /* transform: scaleY(0); */
    }

    .text-select .input:focus+.select {
      /* transform: scaleY(1); */
    }
  </style>
</head>

<body>
  <div class="text-select">
    <input type="text" class="input">
    <div class="select">
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
      <span>11111111111</span>
    </div>
  </div>

  <script>
    const input = document.querySelector('.input')
    const select = document.querySelector('.select')

    input.onfocus = function(){
      select.style.transition = 'none'
      select.style.height = 'auto'
      const height = select.offsetHeight // 获取元素真实高度
      select.style.height = 0
      select.offsetHeight  // 读取layout属性，强制页面回流reflow，使页面重新渲染
      select.style.transition = '1s'
      select.style.height = height + 'px' // 重新设置高度
    }

    input.onblur = function(){
      select.style.height = 0
    }
  </script>
</body>



</html>
```
