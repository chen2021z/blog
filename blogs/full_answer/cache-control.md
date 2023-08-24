---
title: cache-control中 no-cache和no-store的区别？
date: 2023/5/21
tags:
 - cache-control
categories:
 - http
---

## cache-control: no-cache和no-store的区别？

"Cache-Control: no-cache"和"Cache-Control: no-store"是HTTP响应头中的两种不同指令，用于控制缓存行为。

区别如下：

- "Cache-Control: no-cache"：表示在使用缓存前需要先验证其有效性。当客户端发送请求时，缓存会将请求发送到服务器进行验证。如果服务器返回304 Not Modified状态码，则表示缓存有效，可以使用缓存副本。如果服务器返回新的数据或其他状态码，则表示缓存无效，客户端必须从服务器获取最新的数据。
- "Cache-Control: no-store"：表示不允许任何形式的缓存。这意味着每次请求都必须直接从服务器获取最新的数据，且不应将响应存储在缓存中。所有相关的缓存（包括浏览器缓存、代理服务器缓存等）都必须遵守这个指令，不能对响应进行缓存。

总结而言，"Cache-Control: no-cache"要求在使用缓存前进行有效性验证，而"Cache-Control: no-store"则完全禁止缓存，要求每次都从服务器获取最新数据。