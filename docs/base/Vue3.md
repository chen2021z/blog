---
title: Vue3面试
date: 2023/03/17
tags:
 - Vue2
categories:
 - 面试题  
---


# Vue3

## Vue3比Vue2有什么优势？

1. 性能更好
2. 体积更小  
3. 更好的ts支持
4. 更好的代码组织
5. 更好的逻辑抽离
6. 更多新功能

## 生命周期

### options API生命周期

+ beboreDestroy改为beforeUnmount
+ destoryed改为unmounted
+ 其他沿用Vue2的生命周期

### composition API生命周期

+ setup相当于beforeCreate和created
+ 名字前加on，如onBeforeMount，onMounted







## CompositionAPI带来了什么？

+ 更好的代码组织
+ 更好的逻辑复用
+ 更好的类型推导

### 如何选择？

+ 不建议共用，会引起混乱

+ 小型项目、业务简单，optionsAPI

+ 中大型项目、逻辑复杂，用CompositionAPI

  

##  理解ref toRef 和 toRefs 

### ref

+ 生成值类型的响应式数据
+ 可用于模板和reactive里，都不需要.value
+ 通过.value修改值

### toRef

基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

+ toRef如果用于普通对象则产出的结果不具有响应式 
+ 创建一个ref，具有响应式
+ 两者保持引用关系

### toRefs

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

+ 当从组合式函数中返回响应式对象时，`toRefs` 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性，如果是reactive对象 直接将其结构则会失去响应性

+ ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
  
    // ...基于状态的操作逻辑
  
    // 在返回时都转为 ref
    return toRefs(state)
  }
  
  // 可以解构而不会失去响应性
  const { foo, bar } = useFeatureX()
  
  ```

### 最佳使用方式

+ 用reactive做对象的响应式，用ref做值类型的响应式

+ setup中返回toRefs(state)，或者toRef(state, "xxx")

+ ref变量命名使用xxxRef

+ 组合式函数返回响应式对象，使用toRefs

  

###  进阶理解

+ 为什么需要ref？

  + 返回值类型，会丢失响应式
  + 如在setup、computed、组合式函数里都有可能返回值类型
  + 因为有需求，Vue如果不定义ref，用户将自造ref，反而混乱

+ 为什么需要.vlaue?

  + 在Vue3中，ref是用来对基本类型数据进行响应式处理的一个API。与Vue2中的data属性不同，ref并不是直接返回被包装的数据本身，**而是一个包含value属性的对象**，需要通过访问`value`属性才能获取被包装的数据。
  + 这是因为在Vue3中，为了提高响应式系统的性能和可维护性，采用了一种新的内部实现机制——Proxy，而**Proxy只能拦截对象的读写操作**，无法直接拦截基本类型数据的读写操作。因此，在Vue3中，**为了实现对基本类型数据的响应式处理**，需要将基本类型数据**包装成一个对象**，并提供一个访问这个对象的属性的方法，这就是ref所做的事情。
  + 这样做的好处是能够利用Proxy机制对对象的读写进行拦截，提高响应式系统的性能和可维护性。

+ 为什么需要toRef toRefs?

  + 初衷：在不丢失响应式地情况下，把对象数据分解、扩散

  + 前提：针对响应式对象（reactive），而非普通对象

  + 注意：**不创造响应式，而是延续响应式**


## Vue3升级了哪些功能？

1. createApp，返回应用实例

2. emits属性，接收父组件的自定义事件

3. Fragment

4. v-model

   1. prop和事件默认名称改为modelValue和：update:modelValue
   2. 移除.sync修饰符和model选项，可在v-model上添加参数代替
   3. 支持多个v-model和自定义v-model修饰符

5. key

   1. 不再建议在 `v-if`/`v-else`/`v-else-if` 的分支中继续使用 `key` attribute，因为没有为条件分支提供 `key` 时，也会自动生成唯一的 `key`

   2. 当使用 `<template v-for>` 时如果存在使用 `v-if` 的子节点，则 `key` 应改为设置在 `<template>` 标签上。

   3. ```vue
      <!-- Vue 2.x -->
      <template v-for="item in list">
        <div v-if="item.isVisible" :key="item.id">...</div>
        <span v-else :key="item.id">...</span>
      </template>
      
      <!-- Vue 3.x -->
      <template v-for="item in list" :key="item.id">
        <div v-if="item.isVisible">...</div>
        <span v-else>...</span>
      </template>
      ```

6. v-if与v-for优先级

   1. 在3中`v-if` 会拥有比 `v-for` 更高的优先级

7. 生命周期

8. 异步组件的写法

   1. 新的 `defineAsyncComponent` 助手方法，用于显式地定义异步组件
   2. `component` 选项被重命名为 `loader`
   3. ![image-20230318160356272](/image-20230318160356272.png)

9. 新增组件：Teleport、Suspense

10. CompositionAPI

    1. 抽离逻辑函数到一个函数
    2. 函数命名约定为useXxx格式

## Vue3响应式

### Reflect作用与目的

+ 和proxy能力一一对应

+ 规范化、标准化、函数式

+ 代替Object上的工具函数

+ ```js
  const obj = {a: 100, b: 200}
  
  'a' in obj  //true
  Reflect.has(obj, 'a') //true
  
  delete obj.b
  Reflect.deleteProperty(obj, 'b')
  
  Object.getOwnPropertyNames(obj)
  Reflect.ownKeys(obj)
  ```

### 优化点

+ 深度惰性监听，性能更好
+ 可监听新增、删除属性
+ 可监听数组变化

### 总结

+ proxy能规避Object.definproperty的问题
+ Proxy无法兼容所有浏览器，无法polyfill

### 怎么实现响应式（面试回答）

在 Vue3 中，实现响应式的方式与 Vue2 有所不同，主要是通过新的 `reactive` 和 `ref` 函数来实现。`reactive` 函数将一个普通的 JavaScript 对象转换成响应式对象，而 `ref` 函数则用于将一个基本类型的值转换成响应式对象。

1. `reactive` 的实现

`reactive` 函数的实现依赖于 ES6 中的 `Proxy` 对象。在 Vue3 中，使用 `Proxy` 对象代理目标对象，并在代理对象上定义 `get` 和 `set` 方法来实现对目标对象属性的访问和修改的拦截。在 `get` 和 `set` 方法中，通过调用 `track` 和 `trigger` 函数来实现对属性的依赖追踪和更新视图通知。

```js
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      // 追踪依赖
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        // 触发更新通知
        trigger(target, key);
      }
      return result;
    }
  };
  return new Proxy(target, handler);
}
```

2. `ref` 的实现

`ref` 函数的实现依赖于 JavaScript 中的原始类型和对象的特点。在 Vue3 中，使用 JavaScript 中的原始类型和对象来代表响应式对象，并使用 `Proxy` 对象代理这些原始类型和对象，从而实现对它们的访问和修改的拦截。

下面是 `ref` 函数的简化实现：

```js
function ref(value) {
  const refObj = {
    value,
    get() {
      track(refObj, 'value');
      return refObj.value;
    },
    set(newValue) {
      if (newValue !== refObj.value) {
        refObj.value = newValue;
        trigger(refObj, 'value');
      }
    }
  };
  return new Proxy(refObj, {
    get(target, key, receiver) {
      if (key === 'value') {
        return target.get();
      } else {
        return Reflect.get(target, key, receiver);
      }
    },
    set(target, key, value, receiver) {
      if (key === 'value') {
        target.set(value);
      } else {
        Reflect.set(target, key, value, receiver);
      }
      return true;
    }
  });
}
```



## watch和watchEffect的区别

+ 两者都可以监听属性变化
+ watchEffect会根据其中的属性，自动监听其变化 
+ watchEffect初始化时会监听一次（收集要监听的数据）

## setup中如何获取组件实例

+ setup和其他CompositionAPI中没有this
+ 可通过getCurrentInstance获取当前实例
+ 若使用OptionsAPI可照常使用this

### Vue3为何比Vue2快

+ Proxy响应式
+ PatchFlag
  + 模板编译时，动态节点做标记
  + 标记分为不同的类型，如 text props class等
  + 目的： diff算法时，可以区分静态节点，以及不同类型的动态节点，优化diff算法
  + <img src="/image-20230318200206827.png" alt="image-20230318200206827" style="zoom:67%; float:left" />
+ hoistStatic 
  + 将静态节点的定义  提升到父作用域，缓存起来
  + 多个相邻的静态节点，会被合并起来
  + 典型的拿空间换时间
+ cacheHandler
  + 缓存事件
+ SSR优化
  + 静态节点直接输出，绕过vdom
  + 动态节点，还是需要动态渲染 
+ tree-shaking
  + 编译时，根据不同的情况（用了哪些指令、功能），引入不同的API

## Vite

### 为什么启动快

+  开发环境使用ES6 Module，无需打包---非常快
+  生产环境使用rollup，不会快很多