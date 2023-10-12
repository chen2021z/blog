---
title: 二叉树层序遍历
date: 2023/10/12
tags:
 - levelOrder
categories:
 - 算法
---

>talk is cheap, show you my code!
```js
function levelOrder(root) {
  if (!root) return [];
  // result存储结果  queue队列里面存储每层节点
  const queue = [root];
  const result = [];

  while (queue.length) {
    // 记录当前层级节点数
    let length = queue.length;
    //存放每一层的节点
    const curLevel = [];
    for(let i = 0; i < length; i++){
      const node = queue.shift()
      curLevel.push(node.val)
      // 存放下一层的节点
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    // 把每一层的结果放到数组
    result.push(curLevel)
  }

  return result;
}


// 定义一个二叉树节点类
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
// 构建一棵二叉树
const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

// 执行层序遍历并输出结果
console.log(levelOrder(root));
```