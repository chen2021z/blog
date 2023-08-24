---
title: HTTP面试题
date: 2023/03/3
tags:
 - http
categories:
 - 面试题  
---

## http状态码

+ 状态码分类

  + 1xx服务器收到请求
  + 2xx请求成功
  + 3xx重定向
  + 4xx客户端错误
  + 5xx服务端错误

+ 常见状态码 

  200、301永久重定向（浏览器会记住）、302临时重定向、304资源未被修改（本地有缓存）、404、403没有权限、500服务器错误、504网关超时

+ 关于协议和规范 

  不要违反规范，如IE

- 301：如果你访问一个网站，但是发现网站已经搬家了，那么服务器会返回一个301状态码，告诉你现在的网址是什么，以后你就要访问这个新的网址了。
- 302：如果你访问一个网站，但是服务器发现你现在的浏览器不支持某些功能，就会给你跳转到一个备用页面，这时候服务器会返回一个302状态码。
- 304：如果你访问一个网站，但是服务器发现你的浏览器缓存里已经有了这个网页的内容，那么服务器就不会再重新发送一遍，而是直接从你的缓存里读取内容并返回给浏览器。
  
**错误状态码：**
1. **401 Unauthorized**：表示请求需要用户身份验证，但用户未提供有效的身份验证凭据或凭据无效。客户端通常会显示一个登录提示，以便用户提供正确的凭据。
2. **403 Forbidden**：表示服务器理解请求，但拒绝执行该请求。这可能是因为服务器已经理解请求，但不允许对请求的资源进行操作，或者是因为身份验证成功但权限不足。
3. **405 Method Not Allowed**：表示请求中使用了不被允许的 HTTP 方法。服务器已经理解请求，但不支持请求中指定的方法。
4. **500 Internal Server Error**：表示服务器在执行请求时遇到了内部错误。这可能是由于服务器出现了代码错误、配置问题或其他异常情况导致的。
5. **502 Bad Gateway**：表示作为代理或网关的服务器从上游服务器接收到无效的响应。通常意味着上游服务器无法正常工作或返回了无效的响应。
6. **504 Gateway Timeout**：表示作为代理或网关的服务器在等待上游服务器的响应时超时。通常意味着上游服务器无法及时响

## methods

+ 传统的methods

  + get获取数据
  + post提交数据

+ 现在的methods  

  + get获取数据
  + post新建数据
  + patch/put更新数据
  + delete删除数据


## RestfulAPI

一种较 新的API设计方法

传统API设计：把每个url当作一个**功能**，如 GET /api/list?pageIndex=2、POST /api/update?id=100

RestfulAPI设计：把每个url当作一个**唯一的资源**，如 GET /api/list/2 、 PUT  /api/list/2 使用同一个url，不同的method

+ 尽量不使用url参数
+ 用methods表示操作类型

​		

## headers

### 常见的Requst Headers  

+ Accept 浏览器可接收的数据格式
+ Accept-Encoding 浏览器可接受的压缩算法，如gzip
+ Accept-Languange 浏览器可接收的语言，如zh-CN
+ Connection:keep-alive 一次TCP连接重复使用
+ cookie
+ Host 请求的域名
+ User-Agent（UA）浏览器信息
+ Content-type 发送数据的格式，如application/json



### 常见的Response Headers

+ Content-type 返回数据的格式，如application/json
+ Content-length 返回数据的大小，多少字节
+ Content-Encoding 返回数据的压缩算法，如gzip
+ Set-Cookie 服务端改cookie

 

## http缓存

作用：减少网络请求，页面加载更快

可以缓存的资源：——静态资源（js  css  img）



### 强制缓存

<img src="/image-20230308202952000.png" alt="image-20230308202952000" style="zoom: 40%;" /><img src="/image-20230308203629776.png" alt="image-20230308203629776" style="zoom: 40%;" />

+ Cache-Control

  + Resonponse Headers中，控制强制缓存的逻辑，列如Cache-Control：max-age=31526000（秒）

  + 值：max-age（缓存时间 ）/no-cache（不用强制缓存）/no-store（不让服务端做缓存）

+ Expires，已经被Cache-Control

### 协商缓存（对比缓存）

+ 服务端缓存策略，服务端判断客户端能不能用缓存的内容 
+ 一致则返回304，否则返回200和最新资源
+ <img src="\image-20230308205237336.png" alt="image-20230308205237336" style="zoom:50%;" />
+ 资源标识
  + Respons e Headers中，有两种：Last-Modified资源最后修改时间，Etag资源的唯一标识（优先使用）
  + <img src="\image-20230308205759837.png" alt="image-20230308205759837" style="zoom:50%;" />


<img src="\image-20230308210958512.png" alt="image-20230308210958512" style="zoom: 80%;" />







## 刷新操作 

+ 正常操作：输入url，前进后退；强制缓存有效，协商缓存有效；
+ 手动刷新：F5，点击刷新；强制缓存失效，协商缓存有效；
+ 强制刷新：ctrl + F5；强制缓存失效，协商缓存失 效；

 