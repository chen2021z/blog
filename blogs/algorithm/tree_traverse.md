---
title: 前中后序遍历二叉树
date: 2023/8/14
tags:
 - Tree Traverse
categories:
 - 算法
---




```typescript
// 二叉树的遍历

interface ITreeNode {
  value: number;
  left: ITreeNode | null;
  right: ITreeNode | null;
}
const resArr: number[] = [];

/**
 * @param node 前序遍历
 */
function preOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  // 根 左 右
  resArr.push(node.value);
  preOrderTraverse(node.left);
  preOrderTraverse(node.right);
}

/**
 * @param node 中序遍历
 * @returns
 */
function inOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  inOrderTraverse(node.left);
  resArr.push(node.value);
  inOrderTraverse(node.right);
}

/**
 * @param node 后序遍历
 */
function postOrderTraverse(node: ITreeNode | null) {
  if (node == null) return;
  postOrderTraverse(node.left);
  postOrderTraverse(node.right);
  resArr.push(node.value);
}
// preOrderTraverse(tree)
// inOrderTraverse(tree);
// postOrderTraverse(tree)



// 二叉搜索树 BST Binary Search Tree
// 二叉搜索树的特点：左子树的值都小于根节点的值，右子树的值都大于根节点的值
// 中序遍历的结果是一个有序的数组

// 寻找BST中第k小的元素
function getKthSmallest(node: ITreeNode | null, k: number): number | null {
  inOrderTraverse(node);
  // console.log(resArr);
  return resArr[k - 1] || null;
}

const res1 = getKthSmallest(tree, 2)
console.log(res1);


```

