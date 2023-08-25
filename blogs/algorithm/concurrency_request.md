---
title: 控制并发请求数列，结果按原顺序输出
date: 2023/8/25
tags:
 - request
categories:
 - 算法
---

``` javascript
// 模拟接口

/**
 * 并发maxNum个请求，请求结果顺序与urls保持一致
 * @param {*} urls
 * @param {*} maxNum
 */
function concurrencyRequest(urls, maxNum) {
  return new Promise((reslove) => {
    if (urls.length === 0) {
      reslove([]);
      return;
    }
    const result = [];
    let index = 0;  // 按照顺序发送请求
    let count = 0;  //请求的次数

    async function request() {
      if(index === urls.length) return;
      const url = urls[index];
      const i = index;
      index++
      try {
        const res = await fetchFn(url);
        result[i] = res;
      } catch (err) {
        result[i] = err;
      } finally {
        count ++
        if(count === urls.length){
          console.log('请求都已完成');
          reslove(result)
        }
        request()
      }
    }

    const times = Math.min(maxNum, urls.length);
    for (let i = 0; i < times; i++) {
      request();
    }
  });
}

function fetchFn(url) {
  console.log(url);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url % 2 ) {
        resolve({ success: 1, data: url });
      } else {
        reject({ success: 0, data: url });
      }
    }, 3000);
  });
}
const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9];


concurrencyRequest(urls, 3).then(res => {
  console.log(res);
})


```