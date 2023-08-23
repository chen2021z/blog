---
title: JS WebAPI
date: 2023/03/7
tags:
 - js webAPI
categories:
 - 面试题  
---
## DOM

### DOM本质

DOM(Document Object Model)文档对象模型

DOM的本质是从HTML文件解析出来的一棵树



### DOM节点操作

+ 获取DOM节点
+ attribute
  + 是HTML标签上的某个属性，如id、class、style 、value等以及自定义属性，它的值只能是字符串，关于这个属性一共有三个相关的方法，setAttribute、getAttribute、removeAttribute；修改html属性，会改变html标签结构
+ property
  + 是js获取的DOM对象上的属性值，如nodeName、className、value等等；修改属性，不会体现到html结构中

### DOM结构操作 

+ 新增、移动节点
+ 获取子元素列表、获取父元素
+ 删除子元素

### DOM性能

+ DOM操作非常耗费资源，避免频繁操作

+ 对DOM查询做缓存

  <img src="/image-20230307145954596.png" alt="image-20230307145954596" style="zoom: 50%;" />

+ 将频繁操作改为一次性操作

  <img src="/image-20230307150011474.png" alt="image-20230307150011474" style="zoom: 67%;" />

## BOM

BOM（Browser Object Model）浏览器对象模型

+ 如何识别浏览器的类型

+ 分解url的各个部分

  ```js
  // navigator
  const ua = navigator.userAgent
  console.log(ua);
  
  // screen
  console.log(screen.width);
  console.log(screen.height);
  
  // location
  console.log(location.href);  // url
  console.log(location.protocol); // http:  https:
  console.log(location.host); // 域名 or ip+端口
  console.log(location.pathname); // url路径
  console.log(location.search); // 携带的参数
  console.log(location.hash); // hash内容如： #xxx
  
  // history
  history.back()
  history.forward()
  ```

  



## 事件

事件不会，等于残废！  

### 事件绑定 

```js
// 通用的绑定函数
function bindEvent(ele, type, cb) {
  ele.addEventListener(type, cb);
}
const a = document.getElementById("link");
bindEvent(a, "click", (e) => {
  e.preventDefault(); //阻止默认行为
  e.stopPropagation(); //当阻止冒泡后，body就监听不到
  console.log('a click');
});

// body通过事件冒泡 监听
const body = document.body;
bindEvent(body, "click", (e) => {
  console.log(e.target); // 能通过冒泡拿到触发事件的元素
  console.log('body click');
});
```

### 事件代理

+ 代码简洁
+ 减少浏览器内存占用
+ 不要滥用

```html
<div class="box">
    <a href="#">1</a><br>
	<a href="#">2</a><br>
	<a href="#">3</a><br>
</div>

<script>
// 事件代理
const box = document.getElementsByClassName("box")[0];
bindEvent(box, "click", (e) => {
  e.preventDefault()
  const target = e.target
  if(target.nodeName === 'A'){
    // 对子元素进行统一地处理
    alert(target.innerHTML)
  }
});
</script>
```



## Ajax

### XMLHttpRequest

```js
// XMLHttpRequest
const xhr = new XMLHttpRequest()
// get
xhr.open('GET', '/data/test.json', true)//true异步请求，false同步请求
xhr.onreadystatechange = function(){
  // 异步执行
  if(xhr.readyState === 4){
    if(xhr.status === 200){
      console.log(JSON.parse(xhr.responseText))
    }else{
      alert('!== 200')
    }
  }
} 
xhr.send(null)

// post
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function(){
  // 异步执行
  if(xhr.readyState === 4){
    if(xhr.status === 200){
      console.log(JSON.parse(xhr.responseText))
    }else{
      alert('!== 200')
    }
  }
} 
const data = {
  name: '张三',
  password: 123456
}
// xhr.send(JSON.stringify(data))
```



## 状态码

### xhr.readystate

+ 0-（未初始化），还没调用send方法
+ 1-（载入），已经调用send方法，正在发送
+ 2-（载入完成），send方法执行完毕，已经接收到全部内容
+ 3-（交互），正在解析响应内容
+ 4-（完成），响应内容解析完成，可以在客户端调用

### xhr.status

+ 2xx  成功
+ 3xx  需要重定向，如301，302，304
+ 4xx  客户端请求错误，如404，403
+ 5xx  服务端错误

## 跨域

+ 同源策略：Ajax请求时，浏览器要求当前网页和server必须同源（安全）

+ 同源：协议，域名，端口，三者完全一致

+ 无视同源策略：

  ```html
  <img src=跨域图片地址/>
  
  <!-- link和script可使用CDN，script可实现JSONP-->
  <link src=跨域的css地址 />
  <srcipt src=跨域的js地址></script>
  ```

###  JSONP

+ 概述：JSONP (JSON with Padding) 是 JSON 的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

+ 原理：事先定义一个用于获取跨域响应数据的回调函数，并通过没有同源策略限制的`script`标签发起一个请求（将回调函数的名称放到这个请求的`query`参数里），然后服务端返回这个回调函数的执行，并将需要响应的数据放到回调函数的参数里，前端的`script`标签请求到这个执行的回调函数后会立马执行，于是就拿到了执行的响应数据

+ 流程：

  ```js
  <script src="http://jsonp.js?callback=cb"></script>
  //或
  let script = document.createElement('script');
  script.src = "http://jsonp.js?callback=cb";
  body.append(script)
  ```

  ```js
  router.get('/', function (req, res, next) {
      (() => {
          const data = {
              x: 10
          };
          let params = req.query;
          if (params.callback) {
              let callback = params.callback;
              res.send(`${callback}(${JSON.stringify(data.x)})`);
          } else {
              res.send('err');
          }
      })();
  });
  ```

  最后，客户端接收到返回的 JS 脚本，开始解析和执行`function(response)`

+ 优缺点

  + 优：不受同源策略限制，兼容性好
  + 缺：只支持GET，不支持POST等其它类型

## 手写简易ajax

```js
// 封装简易ajax
function ajax(url) {
  return new Promise((reslove, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          reslove(JSON.parse(xhr.responseText))
        }else if(xhr.status == 404){
          reject(new Error('404 not found'))
        }else{
          // xxx
        }
      }
    }
    xhr.send(null)
  });
}
const url = '/data/test.json'
ajax(url).then((res) => {
  console.log(res);
})
```



## 存储

### cookie和session

+ `cookie` 它是服务器发送到 Web 浏览器的一小块数据。最早用于服务端与浏览器间的通信，后被用于存储，最大4kb。
  + 服务器发送到浏览器的 cookie，浏览器会进行存储，并与下一个请求一起发送到服务器。
  + 使用场景：
    + 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
    + 个性化设置（如用户自定义设置、主题等）
  + **缺点**：如果cookie随每个请求一起发送，因此它们可能会降低性能（尤其是对于移动数据连接而言）
+ `session`，客户端请求服务端，服务端会为这次请求开辟一块`内存空间`，生成一个对象存储用户信息，这个对象便是 Session 对象。
  + session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些属性和配置信息。
  + 当客户端关闭会话，或者 Session 超时失效时会话结束。
  + **缺点**：比如 A 服务器存储了 Session，就是做了负载均衡后，假如一段时间内 A 的访问量激增，会转发到 B 进行访问，但是 B 服务器并没有存储 A 的 Session，会导致 Session 的失效。

​	<img src="/image-20230307213217391.png" alt="image-20230307213217391" style="zoom: 80%;" />

### Session Cookies的认证流程

1. 客户端第一次发送请求到服务端，服务端创建对应的session对象，并在响应头返回SeesionID(也就是Set-Cookie)
2. 客户端接收到服务端的SessionID后，会将此信息存储在Cookie上，同时记录这个SessionID属于哪个域名
3. 当客户端再次访问服务端，请求会自动判断改域名下是否存在Cookie信息，如果有就从Cookie中拿到SessionID找到对应的Session，没有则中断

### JWT（JSON Web Token）的认证流程

1. 客户端发送信息给服务端验证
2. 客户端验证用户信息，验证通过后签发一个token（相当于SessionID）返回给客户端，客户端收到后会存储在Cookie或Storage中
3. 客户端继续第二次业务请求，请求头的Authorization字段携带这个token或直接放在Cookie中
4. 服务端根据headers中的token进行验证，通过后返回请求数据

### JWT 和 Session Cookies认证的不同

JWT 和Session Cookies 都提供安全的用户身份验证，但是它们有以下几点不同

1. JWT 具有**加密签名**，而 Session Cookies 则没有。
2. JWT 是`无状态`的，因为声明被存储在`客户端`，而Session Cookies 存于服务端内存中，占用的资源更大。
3. Session Cookies 只能用在`单个节点的域`或者它的`子域`中有效。如果它们尝试通过第三个节点访问，就会被禁止。而 JWT 可以解决这个问题，使用 JWT 能够通过`多个节点`进行用户认证，也就是我们常说的`跨域认证`



### localStorage和sessionStorage

HTML5专门为存储设计，最大可存5M，

API简单易用，setItem, getItem

不会随http请求发送出去

+ localStorage数据会永久存储，除非代码或手动删除
+ sessionStorage数据只存于当前会话，浏览器关闭则清除