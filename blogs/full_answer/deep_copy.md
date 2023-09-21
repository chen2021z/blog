---
title: 深拷贝（终极版本）
date: 2023/9/21
tags:
 - deepCopy
categories:
 - js
---


> 通过weakmap解决循环引用的问题，同时考虑到了克隆对象是map，set，date的情况。

```js
function deepCopy2(obj, clonedObjects = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj)
  }

  let cloneObj

  if (obj instanceof Set) {
    cloneObj = new Set()
    clonedObjects.set(obj, cloneObj)
    obj.forEach(item => {
      cloneObj.add(deepCopy2(item, clonedObjects))
    })
  } else if (obj instanceof Map) {
    cloneObj = new Map()
    clonedObjects.set(obj, cloneObj)
    obj.forEach((key, value) => {
      cloneObj.set(key, deepCopy2(value, clonedObjects))
    })
  } else if (obj instanceof Date) {
    cloneObj = new Date(obj.getTime())
  } else {
    cloneObj = Array.isArray(obj) ? [] : {}
    clonedObjects.set(obj, cloneObj)
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        cloneObj[i] = deepCopy2(obj[i], clonedObjects)
      }
    }
  }

  return cloneObj
}

let obj = { a: 1, b: [1, [2, [3]]], date: new Date(), c: { d: 1 }, f: new Set(['g']), g: new Map([[1, 'one'], [2, 'two']]) };
// let obj = { a: 1, b: [1, [2, [3]]], c: { d: 1 } };
obj.e = obj

console.log(deepCopy2(obj))
```

