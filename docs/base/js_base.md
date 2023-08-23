---
title: JS基础
date: 2023/03/3
tags:
 - js基础
categories:
 - 面试题  
---
## 变量类型和计算

### 值类型与引用类型

+ 常见的值类型

  ```js
  let a // undefined
  const s = 'abc'
  const n = 100
  const b = true
  const y = Symbol('y')
  ```

+ 常见的引用类型

  ```
  cosnt obj = {x: 100}
  cosnt arr = [1,2,3]
  const n = null //特殊的引用类型，指针指向空地址
  
  // 函数 特殊引用类型，但不能用于存储数据，所以没有“拷贝、复制函数”这个说法
  function fun(){}
  ```

+ typeof 运算符

  + 识别所有值类型

  + 识别函数

  + 判断是否是引用类型（不可再细分）

    ```js
    let a // undefined
    const s = 'abc'
    const n = 100
    const b = true
    const y = Symbol('y')
    
    console.log(typeof a); //undefined
    console.log(typeof s); //string
    console.log(typeof n); //number
    console.log(typeof b); //boolean
    console.log(typeof y); //symbol
    ```

    ```js
    // 能判断函数
    console.log(typeof console.log); // function
    console.log(typeof function(){}); //function
    
    // 能识别引用类型
    console.log(typeof null); //object
    console.log(typeof ['a']); //object
    console.log(typeof {b: 'b'}); //object
    ```

    

+ 深拷贝

  + ```js
    function deepClone(obj = {}){
      if(typeof obj !== 'object' || obj == null) return obj
    
      // 初始化返回结果
      let result
      obj instanceof Array ? result = [] : result = {}
    
      for(let key in obj){
        // 保证当前属性来源于自身，不来自原型
        if(obj.hasOwnProperty(key)){
          result[key] = deepClone(obj[key]) 
        }
      }
    
      return result
    }
    ```




### 类型判断

+ 字符串拼接 

  + ```js
    const a = 100 + 10  // 110
    const b = 100 + '10' // '10010'  
    const c = true + '10' // 'true10'
    const d = 100 + parseInt('10') // 110
    ```

+ ==

  + ```js
    100 == '100'  // true
    0 == ''  // true
    0 == false  // true
    false == ''  // true
    null == undefined  // true
    ```

  + ```
    // 除了 == null以外，其他一律用===
    
    const obj = {}
    if(obj.a == null){}
    // 相当于
    if(obj.a === null || obj.a === undefined){}
    ```

+ if语句和逻辑运算

  + truly变量： !!a === true 的变量

  + falsely变量： !!a === false 的变量

  + ```js
    !!0 === false
    !!'' === false
    !!undefined === false
    !!null === false
    !!NaN === false
    !!false === false
    //除了以上情况，其他全是truly变量
    ```

  + if语句和逻辑运算里判断的就是是否为truly还是falsely变量，如if(1)  if(null)等等

  + ```
    10 && 0  //0
    '' || 'abc'  // 'abc'
    ```

### 判断对象是否为空

```js
//方法1：for in
function isEmpty(obj){
    for(let o in obj){
        return false
    }
    return true;
}

//方法2: Object.keys()
function isEmpty(obj){
    //null和undefined 调用keys方法会报错
    return Object.keys(obj || []).length === 0
}

//方法3：JSON.stringify()
function isEmpty(obj){
    return JSON.stringify(obj) === '{}'
}

//!注意：方法3如果循环引用会报错
const obj = {
    a = 1
}
obj.a = obj
isEmpty(obj) //报错

```





## 原型和原型链

### 类型判断-instanceof

 `instanceof` 运算符本来是用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上的，只是刚好可以用来判断类型而已

```js
//xialuo Student的实例，Student类继承People类 
xialuo instanceof Student  // true
xialuo instanceof People  // true
xialuo instanceof Object  // true

[] instanceof Array  // true
[] instanceof Object  // true
{} instanceof Object  // true
```

**补充：Object.prototype.toString.call(xxx)**

调用 `Object.prototype.toString` 方法，会统一返回格式为 `[object Xxx]` 的字符串，用来表示该对象（原始类型是[包装对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive#javascript_中的基本类型包装对象)）的类型。

需要注意的是，在调用该方法时，需要加上 `call` 方法

如果不改变 `this` 指向为我们的目标变量 `xxx`，`this` 将永远指向调用的 `Object.prototype`，也就是原型对象，对原型对象调用 `toString` 方法，结果永远都是 `[object Object]`

```js
// 引用类型
console.log(Object.prototype.toString.call({})); // '[object Object]'
console.log(Object.prototype.toString.call(function () {})); // "[object Function]'
console.log(Object.prototype.toString.call(/123/g)); // '[object RegExp]'
console.log(Object.prototype.toString.call(new Date())); // '[object Date]'
console.log(Object.prototype.toString.call(new Error())); // '[object Error]'
console.log(Object.prototype.toString.call([])); // '[object Array]'
console.log(Object.prototype.toString.call(new Map())); // '[object Map]'
console.log(Object.prototype.toString.call(new Set())); // '[object Set]'
console.log(Object.prototype.toString.call(new WeakMap())); // '[object WeakMap]'
console.log(Object.prototype.toString.call(new WeakSet())); // '[object WeakSet]'

// 原始类型
console.log(Object.prototype.toString.call(1)); // '[object Number]'
console.log(Object.prototype.toString.call("abc")); // '[object String]'
console.log(Object.prototype.toString.call(true)); // '[object Boolean]'
console.log(Object.prototype.toString.call(1n)); // '[object BigInt]'
console.log(Object.prototype.toString.call(null)); // '[object Null]'
console.log(Object.prototype.toString.call(undefined)); // '[object Undefined]'
console.log(Object.prototype.toString.call(Symbol("a"))); // '[object Symbol]'
```

```js
//返回所有类型
function getType(target){
    if(typeof target !== 'object'){
        return typeof target
    }

    //如果是引用类型或者 null，再进行如下的判断
    return Object.prototype.toString
    .call(target)
    .slice(8,-1)
    .toLocaleLowerCase();
}
```



### 原型

```js
// class 实际上是函数，是构造函数的语法糖
typeof People  // function
typeof Object  // function

//隐式原型和显示原型
xialuo.__proto__
Student.prototype
xialuo.__proto__ === Student.prototype
```

![image-20230304222045940](/image-20230304222045940.png)

+ 原型关系
  + 每个class都有显示原型 prototype
  + 每个实例都有隐式原型  __ proto__
  + 实例的__ proto__指向对应的class的prototype
+ 基于原型的执行规则
  + 获取属性或执行方法时，先在自身属性和方法里找
  + 如果找不到则去__ proto__中查找

### 原型链

```js
People.prototype === Student.prototype.__proto__
```

![image-20230304222451585](/image-20230304222451585.png)

```js
xiaoluo.hasOwnProperty('name') //true
xiaoluo.hasOwnProperty('sayHi') //false
xiaoluo.hasOwnProperty('eat') //fslae
xiaoluo.hasOwnProperty('hasOwnProperty') //false
```

![image-20230304223309260](/image-20230304223309260.png)

+ 提示
  + class是ES6语法规范，有ECMA委员会发布
  + ECMA只规定语法规则，即书写规范，不规定如何实现
  + 以上实现都是基于V8引擎实现

### 手写简易JQuery

```js
class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }

  get(index) {
    return this[index];
  }

  each(fun) {
    for (let i = 0; i < this.length; i++) {
      fun(this[i]);
    }
  }

  on(type, fun) {
    return this.each((ele) => {
      ele.addEventListener(type, fun, false);
    });
  }
  // 可扩展更过API
}

// 扩展
JQuery.prototype.dialog = function(info){
  alert(info)
}
// 造轮子
class SurperJQuery extends JQuery{
  constructor(selector){
    super(selector)
  }
  // 扩展自己的API
}
```



## 作用域和闭包

### 作用域和自由变量

![](/image-20230305151824521.png)

+ 作用域

  + 全局作用域

  + 函数作用域

  + 块级作用域（es6新增）  if/for/while...中的{}

    ![image-20230305152220350](/image-20230305152220350.png)

+ 自由变量

  + 一个变量在当前的作用域没有定义，但被使用了
  + 向上级作用域查找，知道找到为止
  + 如果直到全局作用域都没有找到，则报错 xxx is not defined

### 闭包



+ 什么是闭包？

  + 作用域应用的特殊情况，有两种表现：

    + 函数作为参数被传递
    + 函数作为返回值被传递

  + ```js
    // 函数作为返回值
    function create() {
      const a = 100;
      return function () {
        console.log(a);
      };
    }
    const a = 200;
    let fun1 = create();
    fun1();
    
    // 函数作为参数
    function print(fun1) {
      const b = 200;
      fun();
    }
    const b = 100;
    function fun2(){
      console.log(b);
    }
    print(fun2)
    ```

    + 答案都为100
    + 结论：所有的自由变量的查找，是先在**函数定义的地方**，再向上级查找，不是在执行的地方！

+ 闭包的应用

  + 隐藏数据，封装私有变量
  + 制作工具， 如防抖节流，结果缓存等等
  + 绑定函数上下文，如bind

+ 闭包的优点

  + 包含函数内变量的安全，防止变量流入其他环境发生命名冲突，造成环境污染
  + 在适当的时候，可以在内存中维护变量并缓存，提高执行效率。

+ 闭包的缺点

  + 增加了内存消耗量，影响网页性能可能出现问题，过度的使用闭包可能会导致内存泄漏

### this

this取什么样的值是在**函数执行的时候**确定的，不是在定义的时候确定的

+ 作为普通函数

  + ```js
    function fun1() {
      console.log(this);
    }
    fun1(); //window or global
    ```

+ 使用call apply bind

  + [关于三者的异同点文章](https://juejin.cn/post/6844903768132157447)

  + ```js
    fun1.call({ x: 100 }); //{ x: 100 }
    // bind返回一个函数，稍后调用才会执行，call和apply则是立即调用
    const fun2 = fun1.bind({ x: 200 });
    fun2(); //{ x: 200 }
    ```

+ 作为对象方法被调用

  + ```js
    const zhangsan = {
      name: "张三",
      sayHi(){
        // this 指向当前对象
        console.log(this);
      },
      wait(){
        setTimeout(function(){
          // this === window
          console.log(this);
        })
      },
      waitAgain(){
        setTimeout(()=>{
          // this 再次指向当前对象,因为箭头函数取上级作用域的this
          console.log(this);
        })
      }
    };
    ```

+ 在class方法中调用

  + ```js
    class People{
      constructor(name){
        this.name = name
      }
      sayHi(){
        console.log(this);
      }
    }
    const lisi = new People('李四')
    lisi.sayHi()  // lisi 对象
    ```

  + 

+ 箭头函数

  + 箭头函数本身没有，取上级作用域的this

+ 手写bind函数

  + ```js
    // 模拟bind
    Function.prototype.bind2 = function(self,...args){
      // 此处的this为执行bind2的Function
      const context = this
      return function(){
        return context.apply(self,args)
      }
    }
    ```



![image-20230329221501655](/image-20230329221501655.png)

## 异步  

+ 同步
  + 指在 **主线程**上排队执行的任务，只有前一个任务执行完毕，才能继续执行下一个任务
  + 也就是调用一旦开始，必须这个调用 **返回结果**(划重点——）才能继续往后执行。程序的执行顺序和任务排列顺序是一致的。
+ 异步
  + 异步任务是指不进入主线程，而进入 **任务队列**的任务，只有任务队列通知主线程，某个异步任务可以执行了，该任务才会进入主线程。
  + 程序的执行顺序和任务的排列顺序是**不一致**的。
  + 用的setTimeout和setInterval函数，Ajax都是异步操作

+ 实现异步的方法
  + 回调函数（Callback）、事件监听、发布订阅、Promise/A+、生成器Generators/ yield、async/await



### **Promise**

+ ES6中的Promise 是异步编程的一种方案。从语法上讲，Promise 是一个对象，它可以获取异步操作的消息。
+ Promise对象, 可以**将异步操作以同步的流程表达出来**。使用 Promise 主要有以下好处：
  + 可以很好地解决**回调地狱**的问题
  + 语法非常简洁。Promise 对象提供了简洁的API，使得控制异步操作更加容易。
+ 状态的表现
  + pending状态，不会触发then和catch
  + resolved状态，会触发后续的then(onResloved)回调函数
  + rejected状态，会触发then(null, onRejected),没有则触发后续的catch回调函数
+ **then和catch改变状态**
  + then正常返回resolved，里面报错则返回rejected
  + catch正常也返回resolved，里面报错则返回rejected
  + catch是一个语法糖，相当于调用Prmise.prototype.then(null, onRejected)
+ **Promise.all(iterable)**
  + 语法：var p = Promise.all([p1, p2, p3]);
  + Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise实例，如果不是，就会先调用Promise.resolve方法，将参数转为Promise实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）
  + (1) 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
  + (2) 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
+ **Promise.race(iterable)**
  + 语法：var p = Promise.race([p1, p2, p3]);
  + Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。
  + Promise.race方法的参数与Promise.all方法一样，如果不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

### defer和async

+ 区别主要在于一个执行时间,defer会在文档解析完之后执行,并且多个defer会按照顺序执行,而async则是在js加载好之后就会执行,并且多个async,哪个加载好就执行哪个

### **生成器Generators/ yield**

+ Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同，Generator 最大的特点就是可以控制函数的执行。

+ 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状基本情况：

+ **Generator 函数除了状态机，还是一个遍历器对象生成函数**。

+ **可暂停函数, yield可暂停，next方法可启动，每次返回的是yield后的表达式结果**。

+ yield表达式本身没有返回值，或者说总是返回undefined。**next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值**。

+ ```js
  function *foo(x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    return (x + y + z)
  }
  let it = foo(5)
  console.log(it.next())   // => {value: 6, done: false}
  console.log(it.next(12)) // => {value: 8, done: false}
  console.log(it.next(13)) // => {value: 42, done: true}
  ```

  + 首先 Generator 函数调用和普通函数不同，它会返回一个迭代器
  + 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
  + 当执行第二次 next 时，传入的参数12就会被当作上一个yield表达式的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 * 12，所以第二个 yield 等于 2 * 12 / 3 = 8
  + 当执行第三次 next 时，传入的参数13就会被当作上一个yield表达式的返回值，所以 z = 13, x = 5, y = 24，相加等于 42

### event-loop（事件循环/轮询）

+   js是单线程运行的，异步(setTimeout, ajax)要基于回调实现，event loop就是**异步回调的实现原理,**DOM事件也使用回调，基于event loop
+   js的执行
    + 从前到后一行一行执行
    + 如果某一行报错，则停止下面代码的执行
    + 先执行同步，再执行异步

+   event loop过程1
    + 同步代码，一行一行放到call stack执行
    + 遇到异步，先记录下，等待时机（定时、网络请求等），时机到了，就移动到callback quene
+   event loop过程2
    + 如果call stack为空（即同步代码执行完）event loop开始工作
    + 轮询查找callback quene，如有任务则移动到call stack中执行
    + 然后反复轮  询查找 

### async/await

+ async/await 语法上，以同步的方式写的代码能够异步执行，是消灭异步回调的终极武器，但和Promise并不排斥，两者相辅相成

+ async/await和Promise的关系

  + 执行async函数，返回的是Prmoise对象
  + await相当于Promise的then
  + try...catch可捕获异常，代替了Prmoise的catch

+ 执行顺序

  + ```js
    async function async1(){
      console.log('async1 start');// 2
      await async2()  //undefined
      // await 后面的内容都可以看作callback里的内容，即异步
      console.log('async1 center'); // 5
      await async3()
      console.log('async1 end'); // 7
    }
    
    async function async2(){
      console.log('async2');// 3
    }
    async function async3(){
      console.log('async3'); // 6
    }
    
    console.log('script start');// 1
    async1()
    console.log('script end');// 4
    ```

### for ... of

+ for ... in(以及forEach for) 是常规的同步遍历

+ for ... of 常用于异步的遍历

  + ```js
    function muti(num) {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove(num * num);
        }, 1000);
      });
    }
    const nums = [1, 2, 3]
    
    // 一秒后同时打印1 4 9
    nums.forEach(async (item) => {
      const res = await muti(item)
      console.log(res);
    });
    
    // 每次打印间隔一秒
    !(async function(){
      for(let i of nums){
        const res = await muti(i)
        console.log(res);
      }
    })()
    ```

    



### 微任务/宏任务  

+ 宏任务：setTimeout, setInterval, Ajax, DOM事件

+ 微任务：Promise async/await    

+ **微任务执行的时机比宏任务早**

+ event loop和DOM渲染

  1. 每次call stack清空（每次轮询结束），同步代码执行完毕
  2. 执行当前的微任务，从micro task queue取出
  3. **尝试DOM的渲染**
  4. 然后再去触发下一次event loop

+ 微任务/宏任务的区别

  + 宏任务：DOM**渲染后**触发，如seTimeout，是由浏览器规定的

  + 微任务：DOM**渲染前**触发，如Promise，是由ES6语法规定的

  + ```js
    const box = document.getElementById('box')
    const p = document.createElement('p')
    p.innerText = 'this is p'
    box.appendChild(p)
    
    // 微任务：DOM渲染前触发
    Promise.resolve().then(()=>{
      console.log(p.innerText);
      alert('Promise')  //此时DOM未渲染
    })
    
    // 宏任务：DOM渲染后触发
    setTimeout(()=>{
      console.log(p.innerText);
      alert('setTimeout') //此时DOM渲染完成
    })
    ```

+ 从event loop解释，为何微任务执行更早

  + 当执行微任务时，会等待时机，时机到后放入微任务队列
  + 而event loop会在call stack清空后先将所有的微任务一个一个取出来执行
  + 再尝试DOM的渲染，最后取出callback quene中的任务执行

