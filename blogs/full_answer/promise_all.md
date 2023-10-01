---
title: 手写Promise.all
date: 2023/10/1
tags:
 - Promise.all
categories:
 - js
---

> talk is cheap, show you my code.

```js
/**
 * 
 * @param {可迭代对象} proms 
 * @returns promise
 */
Promise.myAll = function (proms) {
  return new Promise((resolve, reject) => {
    let count = 0
    const result = [] // 最终汇总的数据
    let i = 0;
    let fullfilledCount = 0
    for (let prom of proms) {
      const index = i //当前Promise的下标
      i++
      count++
      Promise.resolve(prom).then((data) => { 
        // 1.按顺序收集promise
        result[index] = data
        fullfilledCount++
        if(fullfilledCount === count){
          resolve(result)
        }
      }, reject)

      // 所有的Promise完成，最终状态完成
    }
    if (count === 0) {
      resolve([])
    }
  })
}

let p = new Promise((res)=>{
  setTimeout(()=>{
    res('hello')
  },2000)
})

// all(可迭代对象[]、set) 
Promise.myAll([1, p, 3, Promise.reject('err')]).then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})
```
