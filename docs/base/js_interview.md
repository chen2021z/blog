---
title: JS面试题（精选）
date: 2023/03/10
tags:
 - js面试题
categories:
 - 面试题  
---

## JS常见面试题（精选）

1. var 和 let const  的去区别？

   + var: ES5语法，let const是ES6语法；var有变量提升；

   + var 和 let 是变量，可修改；const 是常量，不可修改；

   + let const 有块级作用域，var 没有


2. typeof 返回什么类型？

   + undefined string boolean number symbol bigint

   + object( typeof null === 'object')

   + function


3. 列举强制类型转换和隐式类型转换？

   + 强制：parseInt parseFloat toString等

   + 隐式：if、逻辑运算、==、+拼接字符串


4. 手写深度比较，模拟lodash isEqual，如下效果

```js
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function isEqual(obj1, obj2) {
  // 1.先判断两个是否都为对象,如果有一个不为对象则判断值是否相等
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  // 2.判断传的是否是同一个对象
  if (obj1 === obj2) return true;

  // 3.判断两个对象的keys数量是否相等
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) return false;

  // 4.以obj1为基准，依次递归判断值是否相等
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) return false;
  }

  // 5.全相等
  return true;
}

const obj1 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj2 = {
  a: 1,
  b: {
    c: 2,
  },
};

console.log(isEqual(obj1, obj2));
```



5. split() 和 join() 的区别？

 ```
'1-2-3'.split('-') // ['1', '2', '3']
[1,2,3].join('-') // '1-2-3'
 ```



6. 数组的pop push unshift shift 分别做什么？(可分点作答)

   + 功能是什么？

   + 返回值是什么？

   + 是否会对原数组造成影响？（都不是纯函数，改变了源数据，有副作用）

   + 补充：常见的纯函数：concat  map filter slice

7. 数组slice和splice的区别？

   + 功能区别（slice切片，splice剪接）
   + 参数和返回值
   + 是否纯函数？

8. [10,20,30].map(parseInt)返回结果是什么？

   + map的参数和返回值？

   + parseInt的参数和返回值？

     ```js
     const res = [10, 20, 30].map(parseInt) //[10, NaN, NaN]
     
     // parseInt(string, radix) 
     // 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。
     parseInt('123', 5) // 将'123'看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
     
     
     // 拆解
     const res1 = [10, 20, 30].map((num, index) => {
       return parseInt(num, index)
     })
     parseInt(10,0) //将10为10进制数，返回它的十进制数， 10
     parseInt(20,1) //将20为1进制数,返回他的十进制数，因20不为1进制数 返回NaN
     parseInt(30,2) //将30为1进制数,返回他的十进制数，因30不为2进制数 返回NaN
     ```

     

9. Ajax get和post的区别？

   + get一般用于查询操作，post一般用于用户提交上传操作
   + get参数拼接在url上，post放在请求体内（数据体积更大）
   + 安全性：post易于预防CSRF 

10. 函数call和apply的区别

    ```js
    //call
    Function.call(obj,[param1[,param2[,…[,paramN]]]])
    //apply
    Function.apply(obj[,argArray])
    ```

    

11. 事件代理（委托）是什么？

    + 利用事件冒泡的机制把一系列的内层元素事件绑定到外层元素，减少重复性代码

12. 闭包是什么？有什么特性？有什么负面影响？

    + 闭包是作用域应用的特殊情况，有两种表现：函数作为参数被传递，函数作为返回值被传递
    + 所有的自由变量的查找，是先在**函数定义的地方**，再向上级查找，不是在执行的地方！
    + 影响：变量会常驻内存，得不到释放。不要乱用

13. 如何阻止事件冒泡和默认行为？

    + event.stopPropagation(),  event.preventDefault()

14. 查找、添加、删除、移动DOM节点的方法？

15. 如何减少DOM操作？

    + 缓存DOM查询结果
    + 多次DOM操作，合并到一次插入

16. 解释jsonp原理，为何它不是真正的ajax？

    1. 事先定义一个用于获取跨域响应数据的回调函数，并通过没有同源策略限制的`script`标签发起一个请求（将回调函数的名称放到这个请求的`query`参数里），然后服务端返回这个回调函数的执行，并将需要响应的数据放到回调函数的参数里，前端的`script`标签请求到这个执行的回调函数后会立马执行，于是就拿到了执行的响应数据

    2. **Ajax 是一个技术统称，是一个概念模型，它囊括了很多技术，并不特指某一技术，它很重要的特性之一就是让页面实现局部刷新。** ajax可以通过XMLHtttpRequest或Fetch实现

    3. <img src="/image-20230311161854148.png" alt="image-20230311161854148" style="zoom:50%;" />

17. document load和ready的区别？

    ```js
    window.addEventListener('load', function(){
       //页面全部资源加载完才会执行，包括图片、视频 
    })
    
    //ready
    document.addEventLister('DOMContentLoaded', function(){
        //DOM渲染完可执行，此时图片视频可能还没有加载完
    })
    ```

    

18. == 和 === 的不同

    1. == 会类型转换
    2. === 严格相等

19. 函数声明和函数表达式的区别

    1. 函数声明 function fun(){...}

    2. 函数表达式 const fun = function(){...}

    3. 函数声明会在代码执行前预加载（变量提升），而函数表达式不会

20. new Object() 和 Object.create() 的区别

    1. {}等同于new Object(), 原型Object.prototype
    2. Object.create({...}) 参数为指定的原型
    3. Object.create(null) 没有原型 

21. 关于this的场景题  

    + ```js
      const User = {
        count: 1,
        getCount(){
          return this.count
        }
      }
      console.log(User.getCount()); // ??
      const fun = User.getCount
      console.log(fun()); // ??
      ```

22. 关于作用域和自由变量的场景题1

    1. ```js
       let i
       for(i = 1; i <= 3; i++){
         setTimeout(function(){
           console.log(i);
         },0)
       }
       // what? 
       ```

23. 关于作用域和自由变量的场景题2

    1. ```js
       let a = 100;
       function test() {
         alert(a);
         a = 10;
         alert(a);
       }
       test();
       alert(a);
       ```

       

24. 判断字符串以字母开头，后面字母数字下划线，长度6-30

    1. ```js
       const reg = /^[a-zA-Z]\w{5,29}/
       ```

    2. 需学习正则规则，手写常见正则表达式

25. 手写trim方法，保证浏览器兼容性

    1. ```js
       String.prototype.trim = function(){
       	return this.replace(/^\s+/,'').replace(/\s+$/,'')
       }
       ```

26. 如何获取多个数子中的最大值

    1. ```js
       function max(){
         const nums = Array.prototype.slice.call(arguments)
         let max = 0;
         nums.forEach(item => {
           if(item > max){
             max = item
           }
         });
         return max;
       }
       
       //可直接使用Math.max()
       ```

27. 如何用js实现继承

    使用class的extends

28. 如何捕获JS程序中的异常？

    1. 有风险的地方使用try catch

    2. ```js
       window.onerror(msg, url, lineNo, columnNo, error){
       	//对于跨域的js，如CDN，不会有详细的报错信息
           //对于压缩的js，还要配合sourceMap，反查到未压缩的行和列
       }
       ```

29. 什么是JSON？

    1. 一种数据可是，本质是一段字符串
    2. json格式和JS对象结构一致，对JS语言更友好
    3. window.JSON是一个全局对象：JSON.stringify JSON.parse

30. 获取当前页面url参数

    ```js
    function query(name) {
      const search = location.search.substr(1); //相当于arr.slice(1)
      const arr = search.split("&");
      const map = new Map();
      arr.forEach((item) => {
        map.set(item.split('=')[0],item.split('=')[1])
      });
      return map.get(name)
    }
    ```

31. 将url参数解析为JS对象

    1. 类似于上题

32. 手写flatern，考虑多层级

    ```js
    function flat(arr){
      // 判断是否已经拍平
      const isDeep = arr.some(item => item instanceof Array)
      if(!isDeep){
        return arr
      }
    
      const res = Array.prototype.concat.apply([], arr)
      return flat(res) //递归
    }
    const res = flat([1,2,3,[4,5,[6]]])
    console.log(res);
    ```

    

33. 数组去重 

    ```js
    // 数组去重
    //方法1 set去重,无法去重引用类型，
    function unique1(arr){
      const res = new Set(arr)
      return [...res]
    }
    // 方法2 indexOf:找到给定元素的第一个索引
    function unique2(arr){
      const res = []
      arr.forEach(item => {
        if(res.indexOf(item) === -1){
          res.push(item)
        }
      });
      return res
    }
    // 方法3 filter+indexOf
    function unique3(arr){
      return arr.filter((item, index) => arr.indexOf(item) === index)
    }
    //方法4 用于对象数组
    function unique4(arr) {
      const res = [];
      const map = new Map();
      arr.forEach((item) => {
        if (!map.has(item.id)) {
          res.push(item);
          map.set(item.id, true);
        }
      });
      return res;
    }
    ```

34. RAF requetAnimation Frame

    + 想要动画流程，更新频率要六十帧每秒，即16.67ms更新视图

    + setTimeout要手动控制频率，RAF浏览器会自动控制

    + 打开后台或隐藏iframe中，RAF会暂停，而setTimeout依然执行

      ```js
      const box = document.getElementById('box')
      
      let curwid = 100
      const maxwid = 640
      
      // setTimeout
      function animate1(){
        curwid += 3
        box.style.width = curwid + 'px'
        if(curwid < maxwid){
          setTimeout(animate1,16.67)
        }
      
      }
      // animate1()
      
      // RAF
      function animate2(){
        curwid += 3
        box.style.width = curwid + 'px'
        if(curwid < maxwid){
          window.requestAnimationFrame(animate2) //时间不用自己控制
        }
      }
      animate2()
      ```

35. 性能优化，从哪几个方面考虑

    1. 原则：多使用内存、缓存，减少计算、网络请求
    2. 方向：加载页面、页面渲染、页面操作流畅度



