---
title: Vue响应式原理
date: 2023/8/10
tags:
 - 响应式
categories:
 - Vue
---

## Vue响应式原理

[官方解释地址](https://v2.cn.vuejs.org/v2/guide/reactivity.html)

**响应式数据的终极目标**：当对象本身或其属性发生变化时，会运行一些函数，最常见的就是render函数。

具体实现上，用到了几个核心部件：

1. Observer
2. Dep
3. Watcher
4. Scheduler

### Observer

![image-20230816151202284](/image-20230816151202284.png)

![image-20230816151518763](/image-20230816151518763.png)

### Dep

![image-20230816153233154](/image-20230816153233154.png)

### Watcher

![image-20230816154243261](/image-20230816154243261.png)

![image-20230816155910299](/image-20230816155910299.png)

### Scheduler

![image-20230816160044262](/image-20230816160044262.png)

### 总体流程

![image-20230816160744609](/image-20230816160744609.png)