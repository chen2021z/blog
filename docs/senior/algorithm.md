---
title:  算法简述
date: 2023/03/21
tags:
 - 算法
categories:
 - 面试题  
---
## 链表和数组，那个实现队列更快？

+ 数组是**连续**存储，push很快，shift很慢
+ 链表是**非连续**存储，add和delete都很快（查找很慢）
+ 结论：链表实现队列更快

## 链表实现队列

+ 单向链表，但要同时记录tail和head
+ 要从tail入队，从head出队，否则出队时tail不好定位
+ length要实时记录，不可遍历链表获取



## 二叉搜索树

+ 数组：查找快，增删慢
+ 链表：查找慢，增删快
+ 二叉搜索树BST：查找快，增删快 ---木桶效应



## 平衡二叉树

+ BST如果不平衡，就成了链表了
+ 所以要尽量平衡：平衡二叉搜索树 BBST
+ BBST 增删查，时间复杂度都是 logn，即树的高度，n是节点数

## 红黑树

+ 一种自平衡二叉树
+ 分为红、黑两种颜色，通过颜色转换来维持树的平衡
+ 相对于普通平衡二叉树，它维持平衡的的效率更高

## B树

+ 物理上是多叉树，但逻辑上是二叉树
+ 一般用于高效IO，关系型数据库常用B树来组织数据
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230322222643691.png" alt="image-20230322222643691" style="zoom:50%; float:left" />







## 堆栈模型

+ JS代码执行时，值类型变量，存储在栈；引用类型，存储在堆
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323141710124.png" alt="image-20230323141710124" style="zoom:50%; float:left" />



### 堆

+ 完全二叉树
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323142239710.png" alt="image-20230323142239710" style="zoom: 50%; float:left" />
+ 最大堆：父节点 >= 子节点
+ 最小堆：父节点 <= 子节点
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323142358470.png" alt="image-20230323142358470" style="zoom:50%; float:left" />
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323142533818.png" alt="image-20230323142533818" style="zoom:50%; float:left" />
+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323143051327.png" alt="image-20230323143051327" style="zoom:50%; float:left" />
+ 使用场景：
  + 堆栈模型
  + 堆的数据，都是在栈中引用，不需要从root遍历
  + 堆恰好的数组形式，根据栈的地址，可用O(1)找到目标







## 动态规划-青蛙跳台阶

+ 要跳一级台阶，1种方式 f(1) = 1
+ 要跳两级台阶，2种方式 f(2) = 2 
+ 要跳n级台阶，方式和：f(n) = f(n -1) + f(n -2)



## 移动0到数组末尾

+ 如 [1,0,3,4,0,5]，输出[1,3,4,5,0,0]
+ 只移动0，其他顺序不变
+ 必须再原数组操作

+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323152525393.png" alt="image-20230323152525393" style="zoom:50%; float: left" />

+ <img src="C:\Users\cz\AppData\Roaming\Typora\typora-user-images\image-20230323152626422.png" alt="image-20230323152626422" style="zoom:50%; float: left" />