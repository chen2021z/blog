---
title: CSS
date: 2023/03/1
tags:
 - css
categories:
 - 面试题  
---

### 布局

+ 盒子模型的宽度如何计算

  + 标准盒模型的宽等于offsetWidth =(内容宽度＋内边距＋边框），无外边距
  + 怪异盒模型，设置的宽度值包括 内容宽度＋内边距＋边框，自动压缩内容宽度

+ margin纵向重叠问题

  ![image-20230301172340172](/image-20230301172340172.png)

  + 相邻元素的margin-top和margin-bottom会发生重叠
  + 空内容的p标签也会重叠
  + 答案：15px

+ margin的top left right bottom负值的情况？

  + margin-top/left负值，元素向上、左移动
  + margin-right负值，自身不受影响，右侧元素左移
  + margin-bottom负值，自身不受影响，下方元素上移

+ bfc的理解与应用？

  + Block format context,  块级格式化上下文
  + 是 一块独立的渲染区域，内部元素的渲染不会影响边界以外的元素
  + **形成bfc的常见条件？**
    + float不为none
    + position为absolute或fixed
    + **overflow不为none，如hidden**
    + display：flex inline-block等

  + **bfc的常见应用**
    + 清除浮动 

+ float布局的问题，以及clearfix

  + 实现圣杯布局和双飞翼布局

    + 三栏布局，中间一栏最先加载和渲染（内容最重要）
    + 两侧内容固定，中间内容随宽度自适应
    + 一般用于pc网页 

  + 圣杯布局和双飞翼布局的技术总结

    + 使用float布局
    + 两侧使用margin负值，以便和中间内容横向重叠
    + 防止中间内容被两侧覆盖，一个用padding,一个用margin

  + 手写clearfix 

    + ```css
      .clearfix::after{
            content:'';
            display: table;
            clear: both;
          }
      ```

      

+ flex画色子  



### 定位

+ absolute和relative根据什么定位
  + relative依据自身定位
  + absolute依据最近一层的定位元素定位

+ 居中对齐有哪些实现方式
  + 水平
    + inline元素：text-align：center
    + block元素：margin：auto、父元素flex布局
    + absolute元素：left：50% + margin-left负值、left:50% + transform:translateX(-50%)、top/left/bottom/right = 0 + margin:auto

  + 垂直
    + line-height值等于height值
    + 其他同水平类似


### 图文样式

+ line-height的继承问题（有坑）

  ```html
  <style>
      body{
        font-size: 20px;
        /* line-height: 30px; */
        /* 直接继承给子元素 */
        /* line-height: 1.5; */
        /* 使用小数或分数会先根据子元素的font-size算出具体的值，继承给p */
        line-height: 200%;
        /* 使用百分比会先根据父元素的font-size算出具体的值，继承给p */
      }
      p{
        font-size: 16px;
      }
  </style>
  
  <body>
    <p>this is p</p>
  </body>
  ```

  

### 响应式

+ rem是什么？
  + 相对长度单位，相对于根元素，常用于响应式布局

+ 如何实现响应式？
  + 使用rem+media-quary,根据不同的屏幕宽度设置html的font-size
  + 弊端：“阶梯型”

+ 网页视口尺寸
  + window.screen.height  // 屏幕高度
  + window.innerHeight  // 网页视口高度
  + document.body.clientHeight // body高度

+ vw/vh
  + vw网页视口宽度大小的1/100
  + vh网页视口高度大小的1/100
  + vmax两者的较大值，vmin两者的最小值


### CSS3

+ 关于CSS3动画