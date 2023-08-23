---
title: HTML
date: 2023/03/1
tags:
 - html
categories:
 - 面试题  
---

+ 如何理解HTML语义化？
  + 让人更容易读（增加代码可读性）
  + 让搜索引擎更容易读（SEO）

+ 默认哪些HTML标签是块级，哪些是内联？
  + display:block/table;  div h1 h2 table ul ol p等；不管内容多少都要独占一行
  + display:inline/inline-block;  span img input button等；不会独占一行，直至浏览器的边缘

+ 什么是DOCTYPE,有何作用？

  + Doctype是HTML5的文档声明，通过它可以告诉浏览器，使用哪一个HTML版本标准解析文档

+ src和href的区别？

  + src全称source，通常用于img、video、audio、script元素，通过src指向请求外部资源的来源地址，指向的内容会嵌入到文档中当前标签所在位置，在请求src资源时，它会将资源下载并应用到文档内，比如说：js脚本、img图片、frame等元素。当浏览器解析到该元素时，**会暂停其它资源下载，直到将该资源加载、编译、执行完毕**。这也是为什么将js脚本放在底部而不是头部的原因。
  + href：全称*hyper reference*，意味着超链接，**指向网络资源**，当浏览器识别到它指向的⽂件时，就会**并⾏下载**资源，**不会停⽌对当前⽂档的处理**，通常用于a、link元素。

+ title和H1的区别、b与strong的区别、i与em的区别

  + *title* 属性表示网页的标题，*h1* 元素则表示层次明确的页面内容标题，对页面信息的抓取也有很大的影响
  + *strong* 是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：strong会重读，而*b*是展示强调内容、
  + *i* 是*italic*(斜体)的简写，是早期的斜体元素，表示内容展示为斜体，而 *em* 是*emphasize*（强调）的简写，表示强调的文本

+ 什么是严格模式与混杂模式？

  + 严格模式：是以浏览器支持的最高标准运行
  + 混杂模式：页面以宽松向下兼容的方式显示，模拟老式浏览器的行为

+ H5和HTML5的区别？

  + H5是一个产品名词，包含了最新的HTML5、CSS3、ES6等新技术来制作的应用
  + HTML5是一个技术名词，指的就是第五代HTML

+ 对于web标准w3c的理解

  + `Web标准`简单来说可以分为结构、表现、行为。其中结构是由HTML各种标签组成，简单来说就是body里面写入标签是为了页面的结构。表现指的是CSS层叠样式表，通过CSS可以让我们的页面结构标签更具美感。行为指的是页面和用户具有一定的交互，这部分主要由JS组成
  + `w3c`,全称：world wide web consortium是一个制定各种标准的非盈利性组织，也叫万维网联盟，标准包括HTML、CSS、ECMAScript等等，web标准的制定有很多好处，比如说：
    + 可以统一开发流程，统一使用标准化开发工具（VSCode、WebStorm、Sublime），方便多人协作
    + 学习成本降低，只需要学习标准就行，否则就要学习各个浏览器厂商标准
    + 跨平台，方便迁移都不同设备
    + 降低代码维护成本

+ HTML5新增了哪些新特性？

  + HTML5主要是关于图像、位置、存储、多任务等功能的增加：
    + 语义化标签，如：article、footer、header、nav等
    + 视频video、音频audio
    + 画布canvas
    + 表单控件，calemdar、date、time、email
    + 地理
    + 本地离线存储，localStorage长期存储数据，浏览器关闭后数据不丢失，sessionStorage的数据在浏览器关闭后自动删除
    + 拖拽释放

+ 你知道SEO中的TDK吗？

  + 在SEO中，TDK其实就是`title`、`description`、`keywords`这三个标签，title表示标题标签，description是描述标签，keywords是关键词标签