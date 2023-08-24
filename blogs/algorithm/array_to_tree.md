---
title: 将一维数组转为树状结构
date: 2023/8/22
tags:
 - arrToTree
categories:
 - 算法
---




```js
const data = [
  {
    id:1,
    label:'l-1',
    parentId:0
  },
  {
    id:2,
    label:'l-2',
    parentId:0
  },
  {
    id:3,
    label:'l-1-1',
    parentId:1
  },
  {
    id:4,
    label:'l-1-2',
    parentId:2
  },
  {
    id:5,
    label:'l-1-2-1',
    parentId:4
  },
  {
    id:6,
    label:'l-1-2-1-1',
    parentId:5
  }
]

function arrToTree(data){
  let result = []
  let map = {}
  // 遍历，存储每个节点的引用
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    let parent = map[item.parentId]
    // 还需判断是否需要添加children属性
    if(parent){
      (parent.children || (parent.children = [])).push(item)
    }else{
      result.push(item)
    }
  })
  return result
}

let res = arrToTree(data)
console.log(res)
```

