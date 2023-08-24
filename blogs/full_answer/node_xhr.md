---
title: nodejs可以发送xmlhttprequest请求吗?
date: 2023/8/16
tags:
 - xhr
categories:
 - nodejs
---

在 Node.js 中，可以使用 `http` 或者更高级的模块（如 `axios`、`node-fetch` 等）来发送 HTTP 请求。然而，`XMLHttpRequest` 是浏览器提供的 API，用于在客户端发起 HTTP 请求，不是 Node.js 的原生功能。

如果你想在 Node.js 中发送类似于浏览器中的 `XMLHttpRequest` 请求，可以使用第三方库 `xhr2` 或 `xmlhttprequest`。这些库允许你在 Node.js 环境中模拟浏览器中的 XMLHttpRequest 功能。你可以使用 npm 或者 yarn 进行安装，然后在 Node.js 代码中引入适当的库并使用它。

以下是一个示例，展示如何使用 `xhr2` 库在 Node.js 中发送 XMLHttpRequest 请求：

```js
const XMLHttpRequest = require('xhr2');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const response = xhr.responseText;
    console.log(response);
  }
};
xhr.send();
```

请注意，虽然可以在 Node.js 中使用 `XMLHttpRequest` 来模拟浏览器中的请求，但在大多数情况下，推荐使用更适合 Node.js 的库来发送 HTTP 请求，例如 `axios`、`node-fetch`、`got` 等。这些库提供了更简洁、易于使用和功能丰富的 API，专为 Node.js 开发而设计，与 `XMLHttpRequest` 相比更适合在 Node.js 环境中进行 HTTP 请求操作。