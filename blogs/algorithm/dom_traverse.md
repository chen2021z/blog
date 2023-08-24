---
title: 遍历DOM树
date: 2023/7/5
tags:
 - Dom Traverse
categories:
 - 算法
---


```typescript
//遍历单个节点
function visitNode(node: Node) {
  if (node instanceof Comment) {
    //注释节点
    console.log("Comment--", node.textContent);
  } else if (node instanceof Text) {
    //文本节点
    let t = node.textContent?.trim();
    if (t) {
      console.log("Text--", t);
    }
  } else if (node instanceof HTMLElement) {
    // element
    console.log("Element--", `<${node.tagName.toLocaleLowerCase()}>`);
  }
}

/**
 * 深度优先遍历dom--递归
 * @param root
 */
function deepFirstTraverse(root: Node) {
  visitNode(root);

  const childNodes = root.childNodes; //获取子节点
  if (childNodes.length) {
    childNodes.forEach((curNode) => {
      deepFirstTraverse(curNode); //递归
    });
  }
}

/**
 * 深度优先先遍历dom--非递归、栈
 * @param root 
 */
function deepFirstTraverse2(root: Node) {
  const stack:Node[] = []

  stack.push(root)
  while(stack.length){
    const curNode = stack.pop()
    if(curNode == null) break;
    visitNode(curNode)
    const childs = curNode.childNodes
    Array.from(childs).reverse().forEach(child => {
      stack.push(child)
    })
  }
}

/**
 * 广度优先遍历，通过队列
 * @param root
 */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = [];
  //根节点入队
  queue.push(root);
  while (queue.length) {
    // 头节点出队
    const curNode = queue.shift();
    if (curNode == null) break;

    visitNode(curNode);
    //头的子节点入队
    const childNodes = curNode.childNodes;
    if (childNodes.length) {
      childNodes.forEach((n) => {
        queue.push(n);
      });
    }
  }
}
```

