---
title: webpack面试题
date: 2023/03/19
tags:
 - 面试题
categories:
 - webpack  
---

前言：成熟的工具，重点在于配置和使用，原理并不高优；webpack5主要是内部效率的优化，配置上没有太多改动

## 基本配置

+ 拆分配置和merge
  + 使用webpack-merge引用common（通用）配置，不必重复编写重复代码
+ 本地服务 dev-server
  + 可配置proxy代理
+ 处理es6
  + 在module/rules里配置babel-loader
+ 处理样式
+ 处理图片
+ 模块化

## 高级配置 

+ 多入口
  + entry里写多个入口，output使用[name]变量（可加hash）来配置出口文件，同时在plugins里需要针对每个入口配置不同的new   WebpackPlugin（注意配置对应的chunks）
+ 抽离和压缩css文件 
  + 开发环境下可使用style-loader将js中的css代码 通过创建style标签插入到html中
  + 生产环境下使用MiniCssExtractPlugin.loader，生产css文件通过link方式导入；同时需要在plugins里配置new MiniCssExtractPlugin配置文件名和打包地址，以及在optimization.minimizer里放置压缩的操作
+ 抽离公共代码
  + 通过optimization.splitChuncks来配置如何抽离公共模块，来避免不必要的重复
  + chunk（代码块、模块）可来自entry、optimization.splitChunks中设置的模块
+ 懒加载
  + 通过异步方式使用import()导入  
+ jsx
  + 通过安装babel-loder @babel/core和**@babel/preset-react**
+ vue
  + 处理vue文件通过vue-loader
+ **module chunk bundle的区别**
  + module：一切可以被引用的文件（css、图片、js）都是一个模块；webpack中一切皆模块
  + chunk：多模块合并成的一个代码块，如 entry import() splitChunk等，每个chunk包含了一些模块和它们的依赖关系
  + bundle：最终的打包文件，包含了多个chunk和一些其他的资源

## 性能优化

### 优化构建速度

（*可用于生产环境）

+ 优化babel-loader（*）

  + ```js
    {
    	test:/\.js&/,
    	use:['babel-loader?cacheDirectory'],//开启缓存
        include:path.resolve(__dirname, 'src'),//明确范围，include/exclude二者选其一
    }
    ```

+ IgnorePlugin避免引入无用模块（*）

  + 例如 import moment from 'moment'，这样回默认引入所有js代码（包含多语言），代码过大，如何之引入中文？

  + ```js
    // 忽略 moment 下的 /locale 目录
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ```

+ noParse 避免重复打包（*）

  + ```js
    module:{
        // 忽略对react.min.js文件的解析处理
    	noParse:[/react\.min\.js/$]
    }
    ```

+ 对比IgnorePlugin与noParse

  + IgnorePlugin：直接不引入，代码中没有
  + noParse：引入但不打包

+ happyPack 或 thread-loader 开启多进程打包（*）

+ ParallelUglifyPlugin 多进程压缩 JS（*）

+ 自动刷新

  + 整个网页全部刷新、速度较慢、状态丢失

+ 热更新

  + 新代码生效，网页不刷新，状态不丢失

+ DllPlugin

  + 动态链接库插件
  + 前端框架如vue React，同一个版本只需构建一次即可，不需每次重新构建
  + DllPlugin 打包出dll文件
  + DllReferencePlugin 使用dll文件




### 优化产出代码

原则：体积更小；合理分包，不重复加载；速度更快，内存使用更少

+ 使用生产环境

  + 自动开启代码压缩
  + Vue React等回自动删除调试代码（开发环境的warning）
  + 自动Tree-Shaking

+ 小图片转base64编码

+ bundle加hash

+ 使用CDN：在output里设置publicPath，如：‘http://cdn.abc.com'，回修改静态文件（js、css、图片）url的前缀

+ 提取公共代码：提取一些公共模块（复用两次以上）、第三方模块（如lodash）

  + ```js
    // 分割代码块
    // 分割代码块
        splitChunks: {
          chunks: "all",
          /**
                 * initial 入口chunk，对于异步导入的文件不处理
                    async 异步chunk，只对异步导入的文件处理
                    all 全部chunk
                 */
    
          // 缓存分组
          cacheGroups: {
            // 第三方模块
            vendor: {
              name: "vendor", // chunk 名称
              priority: 1, // 权限更高，优先抽离，重要！！！
              test: /node_modules/,
              minSize: 0, // 大小限制
              minChunks: 1, // 最少复用过几次
            },
    
            // 公共的模块
            common: {
              name: "common", // chunk 名称
              priority: 0, // 优先级
              minSize: 0, // 公共模块的大小限制
              minChunks: 2, // 公共模块最少复用过几次
            },
          },
        },
    ```

+ 懒加载：大文件通过import()

+ IgnorePlugin：避免打包无用模块，可减少体积 

+ scope hosting：使用 ModuleConcatenationPlugin 将打包后多个函数里的内容合并到一个函数中

  + 代码体积更小
  + 创建函数作用域更少
  + 代码可读性更好
  + <img src="/image-20230320131122988.png" alt="image-20230320131122988" style="zoom:50%; float:left"  />

 

## ESModule和 Commonjs

+  ES6 Module 静态，**编译时引入**，只能放在最外层
+  Commonjs 动态，**执行时引入**
+  只有ES6 Module才能静态分析，实现Tree-Shaking

```js
let apiList = require('./api.js')
if(isDev){
  // 可以动态引入，执行时引入
  apiList = require('./api_dev.js')
}

import apiList from './api.js'
if(isDev){
  // 编译时报错，只能静态引入，放最上层
  import apiList from './api_dev.js'
}
```





## 构建流程概述

  Webpack 的构建流程主要可以分为以下几个步骤：

1. 解析配置文件：Webpack 会读取项目中的配置文件，解析其中的配置信息，例如入口文件、输出路径、loader、插件等。
2. 解析模块依赖：Webpack 会从入口文件开始递归地解析模块的依赖关系，以构建整个应用程序的**依赖图谱**。在解析过程中，Webpack 会根据配置文件中的loader，将不同类型的模块转换成可以在浏览器中执行的代码。
3. 生成打包文件：在解析完所有的模块依赖关系之后，Webpack 会根据配置文件中的输出路径，将打包后的代码**生成到指定的目录**下。在此过程中，Webpack 会根据配置文件中的插件，对生成的代码进行一些**额外的处理**，例如压缩、优化等。
4. 服务端打包：在开发过程中，Webpack 还可以启动一个开发服务器，用于**自动化构建、打包和重新加载**，以加快开发速度。在服务端打包过程中，Webpack 会将所有的资源**打包到内存中**，以提高访问速度和响应能力。



## loader原理

概念：帮助 webpack 将不同类型的文件转换为 webpack 可识别的模块。

 loader 的执行优级为：`pre > normal > inline > post` 。

开发最简单的loader

```js
module.exports = function loader1(content) {
  console.log("hello loader");
  return content;
};
```

## Plugin原理

概念：通过插件我们可以扩展 webpack，加入自定义的构建行为，使 webpack 可以执行更广泛的任务，拥有更强的构建能力。

工作原理：webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。webpack 通过 Tapable 来组织这条复杂的生产线。

 **webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。**                       ——「深入浅出 Webpack」



站在代码逻辑的角度就是：webpack 在编译代码过程中，会触发一系列 `Tapable` 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

**钩子的本质就是：事件。**为了方便我们直接介入和控制编译过程，webpack 把编译过程中触发的**各类关键事件封装成事件接口**暴露了出来。这些接口被很形象地称做：`hooks`（钩子）。开发插件，离不开这些钩子。

`Tapable` 还统一暴露了三个方法给插件，用于注入不同类型的自定义构建行为：

- `tap`：可以注册同步钩子和异步钩子。
- `tapAsync`：回调方式注册异步钩子。
- `tapPromise`：Promise 方式注册异步钩子。

最简单的插件：

```js
class TestPlugin {
  constructor() {
    console.log("TestPlugin constructor()");
  }
  // 1. webpack读取配置时，new TestPlugin() ，会执行插件 constructor 方法
  // 2. webpack创建 compiler 对象
  // 3. 遍历所有插件，调用插件的 apply 方法
  apply(compiler) {
    console.log("TestPlugin apply()");
  }
}

module.exports = TestPlugin;
```





## babel

前端必备工具

### 基本配置

+ 环境搭建
+ .babelrc配置
+ presets 和 plugins

### babel-polyfill 

+ 什么时Polyfill
+ core-js和 regenerator
+ babel-polyfill 即两者的集合，babel7.4之后被**弃用**了，直接推荐使用上面
+ 按需引入：文件较大 ，需要在babelrc文件里配置按需引入
+ 存在的问题：污染全局环境 

### babel-runtime

`babel-runtime` 是一个 JavaScript 运行时库，为使用 Babel 转译的代码提供了一组公共的工具函数和类，它通过一系列的工具函数和类，使转译后的代码更加精简、高效

`babel-polyfill` 会直接在全局环境中注入 polyfill，以使其能够在目标环境中正常运行。而 `babel-runtime` 则是通过将其作为模块引入到需要使用的地方，以减少冗余代码。同时解决了babel-polyfill变量污染的问题。

## 面试题

### 前端为什么要做打包构建？

代码层

+ 文件压缩和资源管理：压缩html css js 图片等资源与合并，进行统一管理，加载更快
+ 编译高级语言或语法：ts es6 模块化 scss等
+ 兼容性和错误检查：polyfill postcss eslint等，保证在不同的浏览器和设备上都能够正常运行。

流程层

+ 统一、高效的开发环境
+ 统一的构建流程和产出标准
+ 集成公司构建规范（提测、上线等） 

### loader和plugin的区别

+ loder 模块转换器，如less -> css
+ plugin 扩展插件，如HtmlWebpackPlugin

### babel和webpack的区别

+ babel：js的新语法编译工具，只关心语法，不关心API和模块化
+ webpack：打包构建工具，是多个loader plugin的集合

### 如何产出一个lib

<img src="/image-20230320153854122.png" alt="image-20230320153854122" style="zoom:50%; float:left" />

### webpack如何实现懒加载

+ import() ，结合Vue React 异步组件；结合Vue-router React-router异步加载路由

### 为何proxy不能被Polyfill

+ 如class可以用function模拟
+ 如Promise可以用callback模拟
+ 但Proxy的**功能**无法是使用Object.defineProperty模拟