---
title:  深广度面试题
date: 2023/03/25
tags:
 - 深广度
categories:
 - 面试题  
---

## 基础部分

1. 为何 0.1 + 0.2 !== 0.3 

   答：计算机使用二进制存储数据，整数转换为二进制数 没有误差，但小数可能无法用二进制准确表达，如0.2转换为 1.1001100......

   转换结构存在精度误差

2. Ajax-Fetch-Axios 的区别

   Ajax：技术统称  

   Fetch：浏览器原生API，用于网络请求，对比xhr，语法跟简洁，支持Promise

   Axios：网络请求库，内部可用xhr和fetch实现

3. 防抖和节流

   防抖：**指触发事件后，在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算时间**

   节流：**指在一段时间内，事件处理函数只能执行一次，无论该事件被触发了多少次**

4. 箭头函数

   1. 箭头函数有什么缺点？

      没有arguments；无法通过apply call bind改变this，永远指向父作用域；容易难于阅读

   2. 什么时候不能使用箭头函数？

      1. 对象的方法

         ```js
         const obj = {
             a:100,
             getA: ()=>this.a
         }
         console.log(obj.getA)//啥也没有
         ```

      2. 原型方法

         ```js
         const obj = {
           a: 100
         }
         obj.__proto__.getA = () => this.a
         console.log(this.getA(),'getA');  //undefined
         ```

      3. 构造函数

      4. 动态上下文的回调

         ```js
         btn.addEventListener('click', () => {
             //此时 this === window
             this.innerHTML = 'clicked'
         })
         ```

      5. Vue2生命周期和method

         ```js
         {
             data(){return {a:'100'}},
             methods:{
                 getA: () => this.a //会报错
             },
             mounted:() => {
                 console.log(this.a) //会报错
             }
         }
         ```

5. TCP 三次握手和四次挥手

6. for...in  for...of有什么区别？  

   1. key和value的区别：in得到key；of得到value
   2. **适用于不同的数据类型**：遍历对象：in 可以，of不可以；遍历Map Set generator：of 可以，in 不可以
   3. in 用于**可枚举数据**，如：对象、数组、字符串；of **用于可迭代数据**（有无迭代器 Symbol.itorator属性），如数组、字符串、Set、Map、Generator 

7. for await ....of有什么作用？

   可以遍历多个Promise，多个异步


8. offsetHeight  scrollHeight  clientHeight 的区别

   1. offsetHeight：border + padding + content
   2. clientHeight：padding + content
   3. scrollHeight：padding + 实际内容尺寸

9. Node 和 Element的区别？

   1. DOM是一颗树，所有节点都是Node
   2. Node是Element的基类
   3. Element是其他HTML元素的基类，如HTMLDivElement
   4. ![image-20230326171611215](/image-20230326171611215.png)

10. HTMLCollection 和 NodeList区别

    1. HTMLCollection是Element的集合；使用**.children**得到的子元素集合是**HTMLCollection**，不包含文本和注释节点

    2. NodeList是Node的集合；使用**.childNodes**得到的子元素集合是**NodeList**，包含文本和注释节点

    3. **HTMLCollection和NodeList 都不是数组，而是“类数组”**

    4. 将类数组转为数组的方法

    5. ```js
       // list是类数组
       const arr1 = Array.from(list)
       const arr2 = Array.prototype.slice.call(list)
       const arr3 = [...list]
       ```

        

11. Vue组件的通信方式

    1. Vue3:  props  $emit  expose/ref  $attrs  v-model  provide/inject  Vuex/pinia
    2. Vue2:  props $emit .sync  v-model  $chilen/$parent  $attr/$listeners  provide/inject  EventBus  Vuex  

12. mutation 和 action

    1. mutation：原子操作；必须是同步代码
    2. action：可包含多个mutation；可包含异步代码

13. js严格模式有什么特点 

    1. 全局变量必须先声明
    2. 禁用with
    3. eval中声明的变量，函数等等不会提升到eval外部的作用域
    4. 禁止this指向window
    5. 函数参数不能重名

14. HTTP跨域时为何发送options请求

    1. 同源策略一般限制Ajax请求，不能跨域请求server；但不会限制 link img script iframe加载资源
    1. 先发送options请求，查看服务端能支持哪几类请求，这是浏览器自行发起的，无需干预

## 深度部分

1. js 的垃圾回收机制

   JavaScript的垃圾回收机制是一种自动化的内存管理系统，可以自动检测和清除不再使用的对象，以释放内存。这个机制是为了解决JavaScript中的内存泄漏问题而设计的。

   **内存泄漏：非预期的无法回收**

   JavaScript的垃圾回收机制主要基于两个原则： 引用计数、标记清除

   1. 引用计数

      引用计数是一种JavaScript垃圾回收机制，它基于对象的引用数量来确定何时释放内存。每个对象都会有一个引用计数器，当对象被引用时，计数器就会加1。当引用该对象的变量或函数被删除或赋予新值时，计数器就会减1。当计数器为0时，对象就被认为是不再需要的，可以被垃圾回收器清除。

      然而，引用计数机制存在循环引用问题。如果两个或多个对象相互引用，即使它们没有被其他变量引用，它们的引用计数器也不会为0，因此不会被回收。为了解决这个问题，现代的JavaScript实现采用了更先进的垃圾回收算法，如增量标记、分代回收等。

   2. 标记清除

      1. 标记阶段：从全局对象开始，垃圾回收器会遍历所有对象并标记活动对象。为了标记一个对象，垃圾回收器会在对象的头部添加一个标记位（通常是一个特殊的标记值），表明这个对象是活动的。然后，垃圾回收器会递归遍历这个对象的所有引用，并为这些引用中指向的对象添加标记。这个过程会一直递归下去，直到所有活动对象都被标记。
      2. 清除阶段：在标记阶段完成后，垃圾回收器会遍历整个堆，并清除所有未被标记的对象。清除对象的过程涉及将对象占用的内存返回给操作系统，并且从对象的引用中删除对其他对象的引用。这个过程也会递归进行，以确保清除所有未被标记的对象及其引用。 

2. 如何检测程序是否发生内存泄漏：**堆快照、监控内存使用**、代码检查

3. 闭包是内存泄漏么？

   不是；闭包的数据不会被垃圾回收

4. 内存泄漏的场景（Vue）

   + 被全局变量、函数引用，组件销毁时未清除
   + 被全局事件、定时器引用，组件销毁时未清除
   + 被自定义事件引用，组件销毁时未清除

5. WeakMap WeakSet

   WeakMap的key和WeakSet的内容必须是对象，同时保持弱引用，如果没有其他对WeakMap和WeakSet中对象的引用，那么这些对象将会当成垃圾回收掉，也意味着他们中没有存储当前对象的列表，所以他们是不可枚举的。

6. nodejs 异步

   nodejs也使用es语法，也是单线程，也需要异步；异步任务也分宏任务和微任务

   nodejs**宏任务**类型优先级：setTimeout/setInterval  -> I/O callback(处理网络、流的回调)  ->  Idle/prepare(闲置状态)  ->  Poll轮询   ->  Check检查( setImmediate回调 )  ->  Close callback(关闭回调，如socket.on('close')) 

   nodejs**微任务**类型优先级：包括 promise，async/await  process.nextTick；注意prosess.nextTick优先级最高（推荐使用setImmediate代替 process.nextTick）

   nodejs event loop:

   + 执行同步代码
   + 执行微任务（process.nextTick优先级最高）
   + 按顺序执行6个类型的宏任务（每个宏任务开始前都执行当前的微任务）
   + <img src="/image-20230328155022999.png" alt="image-20230328155022999" style="zoom: 50%;" />

   + 与浏览器event loop 的区别：流程基本相同，nodej宏任务和微任务分类型，有优先级

7. vdom真的很快么？出现是为了实现mvvm的理念

   js直接操作DOM会更快，但在整个程序链条上来看，mvvm  简化思路，开发效率、稳定性更高；vdom就是目前最合适的技术方案（不是快，而是合适）

8. for 和 forEach哪个更快？

   for；因为forEach每次都要创建一个函数，会有额外的开销，for不需要（类比循环和递归）；越低级的代码，性能往往更好

9. nodejs 如何开启进程，进程间如何 通讯？

   + 进程 process：OS 进行**资源分配和调度**的最小单位，有独立内存空间
   + 线程 thread：OS 进行**运算调度**的最小单位，共享进程内存空间
   + js 是单线程的，但可以开启多进程执行，如WebWorker；为何需要多进程？多核CPU，更适合处理多进程，更多地利用资源

   答：使用fork，用于开启一个新的进程负责计算量较大地服务，回收计算结果；使用cluster开启多个进程多个服务，提供一份服务；使用send和on传递消息

10. 描述JS Bridge原理？

    1. 什么是JS Bridge?

       因JS无法直接调用native API，需要通过特定地格式来调用，这些格式统称为 JS-Bridge，例如 微信JSSDK

       <img src="/image-20230328193222570.png" alt="image-20230328193222570" style="zoom:50%;" />

    2. JS Bridge地常见实现方式

       注册全局API（只适合处理同步）；URL Scheme

11. requestIdleCallback和requestAnimationFrame有什么区别？

    + requestAnimationFrame每次渲染完都会执行，高优
    + requestIdleCallback 空闲时才执行，低优

    他们是宏任务还是微任务？都是宏任务

12. Vue每个生命周期都做了什么？

    + beforeCreate：创建空白的Vue实例前，data、method未被初始化，不可使用
    + created：Vue实例初始化完成，完成响应式绑定，data、method都已经初始化完成，可调用；但尚未开始渲染模板
    + beforeMount：编译模板，调用render生成vdom，还没有开始渲染
    + mounted：完成DOM渲染，组件创建完成，开始由“创建阶段“进入”运行阶段”
    + beforeUpdate：data发生变化之后，准备更新DOM
    + updated：data发生变化，且DOM更新完成（不要在updated中修改data，可能会导致死循环）
    + beforeUnmount：组件即将销毁（尚未销毁，可正常使用），可移除、解绑一些全局事件，自定义事件
    + unMounted：组件、子组件已经被销毁了
    + activated：缓存组件激活
    + deactivated：缓存组件隐藏

13. Vue什么时候操作DOM比较合适？

    在mounted和updated都不能保证子组件全部挂载完成，使用nextTick渲染DOM

14. Vue-router的三中路由模式

    hash、HTML5（更适合seo，需要后端支持）、MemoryHistory(url默认为/，不会有其他的路由url，前进后退失效)

## 知识广度 

1. 移动端H5 click有300ms延迟，如何解决？ 

   背景：double tap to zoom

   初期解决方案 FastClick：监听touchend事件（touchstart touchend 会优于click触发），使用自定义DOM事件模拟一个click事件，再把默认的click事件（300ms之后触发）禁止掉

   现代浏览器的改进：meta标签里有content:"width=device-width"，认为你已经做了移动端的响应式布局，就不会再有300ms的延迟

2. 网络请求中，**token和cookie有什么区别**？

   cookie：

   HTTP无状态，每次请求都要带cookie，以帮助识别身份；服务端也可以向客户端set-cookie，cookie 大小限制4kb；cookie默认有跨域限制，不可跨域共享、传递cookie

   **在需要跨域携带cookie时，要把withCredentials设置为true，比如**

   ```js
   var xhr = new XMLHttpRequest()
   xhr.withCredentials = true
   xhr.open('GET', 'http://localhost:8888/', true)
   xhr.send(null)
   
   const service = axios.create({
     baseURL: process.env.VUE_APP_BASE_API, // 环境变量base接口地址 url = base url + request url
     withCredentials: true, // 跨域请求时发送Cookie
     timeout: 60000, // 请求超时
     headers: {
       "Content-Type": "application/json; charset=UTF-8;"
     }
   });
   ```

   在服务端要设置Access-Control-Allow-Origin，告诉浏览器允许跨域，而且这个值必须指定域名，不能设置为*响应头中；同时在响应头中，Access-Control-Allow-Credentials这个值也要设置为true。

   cookie本地存储：

   HTML5之前 cookie 常被用于本地存储；HTML5之后，推荐用webStorage

   现代浏览器开始禁用第三方cookie，新增属性SameSite: strict/Lax/None;自己选择  

   **cookie和session**：cookie：用于登录验证，存储用户标识（如userId）,session在服务端，存储用户详细信息，和cookie一一对应，cookie和session 是常见验验证解决方案

   ![image-20230330172157466](/image-20230330172157466.png)

   **token vs cookie**

   + cookie 是HTTP规范，而token是自定义传递
   + cookie 会默认被浏览器存储，而token需要自己存储
   + token 默认没有跨域限制，通过request headers传递，更灵活 
   + cookie 存储userId，服务器存储对应的session对象，包含用户信息；token 包含用户信息，由客户端存储，传递给服务端去解析

   **JWT （JSON Web Token）做用户登录校验**

   + 前端发起登录，后端校验成功后返回一个加密的token
   + 前端自行储存这个token
   + 以后访问服务器接口都带着这个token，作为用户信息

​	 	总结：

​		cookie：HTTP 标准；跨域限制；配合session使用

​		token： 无标准；无跨域限制；用于JWT

3. Session和JWT哪个更适合？

   Session优点：原理简单，用户信息存储在服务端，可快速封禁某个用户；缺点：占用服务端内存，硬件成本高，多进程、多服务时不好同步（需要使用第三方缓存，如redis），默认有跨域限制

   JWT优点：不占用服务端内存，多进程、多服务不受影响，没有跨域限制；缺点：用户信息存储在客户端，无法快速封禁用户，万一服务端密钥泄漏，用户信息全部丢失，token体积一般大于cookie，会增加请求的数据量

   使用场景：如果有严格发u能力用户信息的需求（保密，快速封禁），推荐Session；如没有特殊要求，使用JWT

4. 如何实现SSO单点登录？

   1. 基于cookie：

      cookie 默认不可跨域共享，但有些情况可设置为共享，如主域名相同www.baidu.com  和 image.baidu.com ，设置cookie的domain为主域名，即可共享cookie

      如过主域名完全不同，则cookie 无法共享

   2. 基于token：

      使用SSO技术方案：所有的用户登录、用户信息的保存，ticket的验证全部交由SSO第三方独立服务 ；或是遵循OAuth 2.0规范，类似微信扫码

5. HTTP协议和UDP协议有什么区别？

   HTTP在应用层，TCP UDP在传输层

   <img src="/image-20230331154410169.png" alt="image-20230331154410169" style="zoom:50%;" />

   TCP 稳定连接、可靠传输；UDP 无连接、无断开、不稳定但效率高，适用于视频会议、语音通话

6. HTTP协议 1.0  1.1  2.0 有什么区别？

   1.0：最基础的HTTP协议，短连接版本，规定浏览器与服务器只保持短暂的连接，每一次请求都需要与服务器进行一次TCP连接，连接无法复用，支持基本的get post方法

   1.1：支持持久连接Connection：keep-alive，新增缓存策略 cache-control等；一次TCP连接多次请求；断点续传，状态码 206；支持新的方法 put delete等，可用于Restful API

   2.0：可压缩headers，减少体积；多路复用，一个TCP连接中可以多个HTTP 并发请求；服务端推送，请求优先级等

   3.0：还在实验阶段，解决2.0的问题，新增了一些改进，如基于 QUIC 协议的传输层、更快的速度和更可靠的连接等等

7. 什么是HTTPS 中间人攻击？如何预防？（问加密过程）

   HTTP 是明文传输；

   HTTPS 加密传输 HTTP + TLS/SSL

   ![image-20230331205500720](/image-20230331205500720.png)

    <img src="/image-20230331212814029.png" alt="image-20230331212814029" style="zoom: 67%;" /> 

8. < script>的defer 和 async 属性 

​	![image-20230331213555836](/image-20230331213555836.png)

![image-20230331214248444](/image-20230331214248444.png)

9. prefetch 和 dns-prefetch 有什么区别？

   除了名字像，没什么相关性

   prefetch 和 preload：

   + prefetch 资源在未来页面使用，空闲时加载

   + preload  资源在当前页面使用，会优先加载
![image-20230331214248444](/image-20230331214822569.png)

​		dns-prefetch 和 preconnect
​		dns-prefetch 即 DNS 预查询
​		preconnect 即 DNS 预连接
![image-20230331214248444](/image-20230331215742513.png)


 答案：

prefetch 是资源预获取（和preload相关）

dns-prefetch 是DNS 预查询（和preconnect相关）

1.  前端攻击有哪些？改如何预防？

    + XSS （cross site script）跨站脚本攻击

      手段：黑客将JS代码插入到网页内容，渲染时执行JS ，比如传递cookie
      
      预防：替换特殊字符；vue和react是默认屏蔽xss攻击，除非vue使用v-html指令

    + CSRF（cross site request forgery）跨站请求伪造 

      手段：黑客诱导用户访问另一个网站的接口，伪造请求

      预防：严格的跨域限制，判断来源（referer）+验证码机制；为cookie设置SameSite，禁止跨域传递cookie
      详细过程：用户登录了A网站，有了cookie，然后诱导用户到B网站，并发起A网站的请求，A网站发现有cookie，会认为是用户自己操作的

    + 点击劫持（click jacking）

      手段：诱导界面蒙上一个透明的iframe，诱导用户点击

      预防：让iframe 不能跨域加载：X-Frame-Options: sameorigin 

      ![image-20230331223837647](/image-20230331223837647.png)

    + DDos

      Distribute denial-of-service 分布式拒绝服务

      手段：分布式的、大规模的流量访问，使服务器瘫痪 

      预防：软件层不好做，需要硬件预防（阿里云的WAF） 

    + SQL注入

      手段：黑客提交内容时写入SQL语句，破坏数据库

      预防：处理输入的内容，替换特殊字符

2.  WebSocket 

    + 支持端对端通讯，可以有client发起，也可以由server发起

    + 用于：消息通知，直播间讨论区，聊天室、协同编辑

    + 连接过程：

      先发起HTTP请求，成功之后再升级到WebSocket协议，再通讯

    + <img src="/image-20230401215925077.png" alt="image-20230401215925077" style="zoom: 80%;" />

    + 与HTTP的区别：

      WebScoket的协议名时 ws://, 可双端发起请求；ws没有跨域限制

      通过send和onmessage通讯（HTTP 通过req和res）

      ws 可升级为 wss 像https

      实际项目推荐socket.io, API更简洁

      <img src="/image-20230401220413323.png" alt="image-20230401220413323" style="zoom:50%;" />

    + 和HTTP 长轮询的区别

      HTTP 长轮询：客户端发起请求，服务端阻塞，不会立即返回；需要处理timeout机制，即timeout之后重新发请求

      WebSocket：客户端可发起请求，服务端也可发起请求

      <img src="/image-20230401223519176.png" alt="image-20230401223519176" style="zoom:50%;" />

3.  url 到页面

    分为三大部分：网络请求；解析；渲染 

    + 网络请求：DNS查询得到ip，建立TCP连接包含三次握手；浏览器发送HTTP 请求；接到请求响应，得到HTML源代码，在解析HTML中，如果遇到静态资源还会继续发起网络请求，如js css 图片 视频等；注意：静态资源可能有强缓存 

    + 解析：字符串 -> 结构化数据

      HTML 构建DOM树；CSS 构建CSSOM树（style tree）；两者结合形成render tree

      ![image-20230402150741836](/image-20230402150741836.png)

      解析过程很复杂：css可能来自style link；js可能内嵌、外链还有defer async；

      优化解析：css放在 head中，不要异步加载css；js放在body最下面或合理使用defer async；img提前定义width height

    + 渲染：Render Tree 绘制到页面

      计算各个DOM的尺寸、定位，最后绘制页面；遇到js可能会执行（参考defer async）；异步css 图片加载，可能会触发重新渲染

4.  重绘 repaint 和 重排 reflow 有什么区别？

    动态网页，随时都会重排重绘，例如动画、弹出、显隐切换等； 

    重绘：元素外观变化，如颜色、背景，但元素的尺寸和定位不变，不会影响其他元素的位置

    重派：重新计算尺寸和布局，可能会影响其他元素的位置，如高度变化相邻元素下移

    区别：重排影响要更大，需要避免无意义的重排

    减少重排的方法：集中修改样式，或直接切换class，修改之前设置display：none，脱离文档流；使用BFC特性，不影响其他元素位置 ；频繁触发使用节流和防抖；使用createDocumentFragment批量操作DOM；优化动画，使用CSS和requestAnimationFrame

5.  网页和ifreme如何通讯？

    答案：使用postMessage发送，使用message事件监听；需要注意跨域的限制和判断

6.  new 一个对象发生了什么？

    ```js
    function Foo(name){
      this.name = name
    }
    
    Foo.prototype.getName = function(){
      return this.name
    }
    const f = new Foo('小蓝')
    ```

    过程：

    创建一个空对象obj，继承构造函数的原型，执行构造函数并将obj作为this，最后返回obj 

    自定义实现new

    ```typescript
    
    ```

    

