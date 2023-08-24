---
title: Vue2面试
date: 2023/03/13
tags:
 - Vue2
categories:
 - 面试题  
---

## Vue2基本使用



### computed 和 watch

+ computed有缓存， data不变不会重新计算

+ watch如何深度监听？

  + ```vue
    watch:{
    	info: {
            handler(oldVal, val){},
    		deep: true
    	}
    }
    ```

+ watch 监听引用类型，拿不到oldVal

###  循环（列表）渲染

+ 如何遍历对象？  可以使用v-for

  + ```vue
    <li v-for="(item, index) in listArr" :key="item.id"></li>
    <li v-for="(val, key, index) in listObj" :key="key"></li>
    ```

+ key的重要性。

+ v-for和v-if不能一起使用 

### 事件

+ event参数，自定义参数
+ 事件修饰符，按键修饰符
  + ![image-20230313142436505](/image-20230313142436505.png)
  + ![image-20230313142511548](/image-20230313142511548.png)
+ “观察”事件被绑定到哪里

### 表单

+ v-model
+ 常见的表单项 textarea checkbox radio select
+ 修饰符 lazy number trim

### 组件使用 

+ props $emit
+ 组件间通讯-自定义事件(Eventbus)-状态管理工具(Vuex/Pinia)

### 组件生命周期（单个）

+ 挂载阶段 

  created：将vue的实例初始化了，内存中存在对应的变量，还未开始渲染

  mounted：元素挂载到了页面，绘制完成了

+ 更新阶段

  beforeUpdate->updated：对比虚拟dom，重新渲染并应用更新

+ 销毁阶段

  beforeDestroy：解除绑定，销毁子组件及监听器

<img src="/image-20230313150105981.png" style="zoom:80%;" />

### 生命周期（父子组件）

+ 创建：从外到内

+ 渲染：由内到外

+ 更新：同上

+ ```js
  //挂载
  father created
  son created
  son mounted
  father mounted
  
  // 更新 从数据修改处开始
  father beforeUpdate
  son beforeUpdate
  son updated
  father updated
  ```

## 高级特性

+ 自定义 v-model

  看官方文档

+ $nextTick

  + Vue是异步渲染

  + data改变后，DOM不会立刻渲染

  + $nextTick会在DOM渲染 后被触发，以获取最新的DOM节点

  + ```js
    new Vue({
      // ...
      methods: {
        // ...
        example: function () {
          // 修改数据
          this.message = 'changed'
          // DOM 还没有更新
          this.$nextTick(function () {
            // DOM 现在更新了
            // `this` 绑定到当前实例
            this.doSomethingElse()
          })
        }
      }
    })
    ```

  + 

+ slot

  + 简单讲：父组件想要往子组件里插入内容
  + 基本使用
  + 作用域插槽
  + 具名插槽
  + 具名作用域插槽

+ 动态、异步组件

  + ```vue
    <!-- currentTab 改变时组件也改变 -->
    <component :is="currentTab"></component>
    ```

  + 需要根据数据，动态渲染的场景，即组件类型不确定
  + is的值可以为：被注册的组件名、导入的组件对象
  + 当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过keep-alive强制被切换掉的组件仍然保持“存活”的状态。
  + <img src="/image-20230313172229425.png" alt="image-20230313172229425" style="zoom:50%;" />

+ keep-alive

+ mixin

  + mixin的问题：变量来源不明确，不利于阅读
  + 多mixin可能造成命名冲突
  + mixin和组件肯可能会出现多对多的关系，复杂度较高

## Vue原理

### 组件化

+ “很久以前”就有组件化

  asp jsp php已经有了组件化

+ **数据驱动视图**

  传统组件，只是静态渲染，更新还要依赖于操作DOM

+ MVVM 

### 响应式

+ 组件数据一旦变化，立刻触发视图的更新，是实现数据驱动视图的第一步
+ 核心API-Object.defineProperty
  + 缺点： 深度监听，需要递归到底，一次性计算量大；无法监听新增属性、删除属性（$set/$delete)；无法直接监听数组变化，需要特殊处理（重写原型）

#### 面试总结：

Vue的响应式系统是Vue的核心功能之一，是实现数据驱动视图的关键。在Vue中，只要将数据绑定到视图上，当数据发生变化时，视图会自动更新。Vue的响应式系统通过**监听数据的变化**来实现这一特性。

**重点：**具体来说，Vue会对数据对象的每个属性进行拦截，当属性被**访问**时，Vue会记录这个访问操作，并**建立一个依赖关系**。当这个属性被修改时，Vue会通知所有依赖于这个属性的地方，让它们更新自己的视图。

### vdom和diff

在Vue中，vdom（Virtual DOM，虚拟DOM）是一种技术，用于提高应用程序性能并减少DOM操作。它是一个虚拟的DOM树，与实际的DOM结构相对应，但存在于JavaScript中，而不是实际的HTML文档中。每当状态发生变化时，Vue会使用vdom的算法计算出新的虚拟DOM树，并使用Diff算法比较新旧虚拟DOM树之间的差异。

通过比较两个虚拟DOM树，Vue可以确定哪些部分需要更新，并且可以在需要时仅更新这些部分，而不必重新渲染整个DOM。这种方式可以减少不必要的DOM操作，从而提高应用程序性能。

vdom在Vue中的实现是通过一个名为“render函数”的特殊函数来实现的。该函数使用Vue模板语法和JavaScript语法来创建虚拟DOM树，然后将其转换为实际的DOM。通过使用vdom技术，Vue可以实现高效的响应式UI，同时保持简洁易懂的模板语法。

### 简述版

+ 用JS模拟DOM结构，生成vnode
+ 新旧vnode对比，得出最小的更新范围，最后更新DOM
+ 数据驱动视图的模式下，有效控制DOM操作

![image-20230314172418098](/image-20230314172418098.png)

### diff算法

Diff算法是在虚拟DOM中进行的一种算法，它用于**比较两个虚拟DOM树的差异**，然后将这些差异应用于实际的DOM树上。Diff算法的目的是**最小化更新操作，从而提高性能**。

+ 关键： 将时间复杂度优化到O(n)
  + 只比较同一层级，不跨级比较
  + tag不同，则直接删掉重建，不再深度比较
  + tag和key，如果两者都相同，则认为是相同节点，不再深度比较 
+ ![image-20230314202825806](/image-20230314202825806.png)
+ vdom的存在价值：数据驱动视图，控制DOM操作

### 面试时简述Diff算法

Diff算法是在虚拟DOM中进行的一种算法，它用于比较两个虚拟DOM树的差异，然后将这些差异应用于实际的DOM树上。

Diff算法的目的是最小化更新操作，从而提高性能。  

Vue中的diff算法实现过程主要分为两个阶段：生成虚拟DOM和比较虚拟DOM。

1. 在生成虚拟DOM阶段，Vue会**根据模板解析生成一颗虚拟DOM树**，其中每个节点对应一个DOM元素。虚拟DOM树是一个JavaScript对象，包含了节点的标签名、属性、子节点等信息。

2. 在比较虚拟DOM阶段，Vue会将新旧虚拟DOM进行比较，并对需要更新的节点进行更新。比较虚拟DOM的过程中，Vue采用了一种叫做“双指针”的算法，即同时在新旧虚拟DOM树中设置两个指针，根据一定的规则进行比较和更新。

   具体来说，比较虚拟DOM的过程分为两个步骤：

   1. 首先，Vue会对新旧虚拟DOM树的根节点进行比较，如果它们相同，则将比较的焦点转移到它们的子节点上，继续进行比较和更新。
   2. 如果根节点不同，则Vue会尝试复用旧节点，即通过比较新旧虚拟DOM中相同位置的节点，判断它们是否相同。如果它们相同，则更新旧节点的属性，并递归比较它们的子节点；如果它们不同，则删除旧节点，并在新节点的位置创建新节点，然后递归比较新旧节点的子节点。

​	在比较虚拟DOM的过程中，Vue会根据一些规则来优化比较和更新的效率，例如，当新节点需要替换旧节点时，Vue会尽可能地复用旧节点的子节点，避免不必要的DOM操作。

​	总的来说，Vue中的Diff算法是基于虚拟DOM实现的，通过比较和更新虚拟DOM树，能够高效地更新页面，并且能够避免不必要的DOM操作，提高性能和效率。

## 模板编译

+ 前置知识：JS的with函数 
  + 改变了{}内自由变量的查找规则，当作obj的属性来查找
  + 如果找不到匹配的obj属性，就会报错
  + with要慎用，它打破了作用域规则，可读性变差
+ 模板不是html，有插值、指令、js表达式、能实现循环、判断
+ 使用webpack vue-loader，会在开发环境下编译模板 

### 简述Vue模板编译的过程

Vue模板编译是将Vue模板转换为渲染函数的过程。

Vue模板编译的过程：

1. 解析：将模板解析成 AST，AST 是一个包含所有节点信息(类型，属性，指令，子节点等信息)的树形结构。

2. 优化：对 AST 进行优化，优化过程会移除无用节点、合并相邻的文本节点、静态节点提取等操作。例如，在模板中如果存在一些静态节点（不需要响应式更新的节点），Vue.js会将其提取出来，并在渲染时直接输出静态节点的值，避免不必要的渲染。

3. 代码生成：将优化后的 AST 转换成渲染函数。渲染函数中包含了渲染节点、处理指令、监听事件等相关的逻辑。

4. 缓存：如果模板被缓存，则Vue将编译后的渲染函数缓存起来，以便在需要重新渲染相同的模板时可以重用该函数。

   

## 渲染过程

### 初次渲染

+ 解析模板为render函数（在开发环境下已经完成，vue-loader）

  1. 解析：将模板解析成 AST，AST 是一个包含所有节点信息(类型，属性，指令，子节点等信息)的树形结构。
  2. 优化：对 AST 进行优化，优化过程会移除无用节点、合并相邻的文本节点、静态节点提取等操作。例如，在模板中如果存在一些静态节点（不需要响应式更新的节点），Vue.js会将其提取出来，并在渲染时直接输出静态节点的值，避免不必要的渲染。
  3. 代码生成：将优化后的 AST 转换成渲染函数。渲染函数中包含了渲染节点、处理指令、监听事件等相关的逻辑。
+ 触发响应式，监听data属性getter和setter
+ 执行render函数，生成vnode，执行patch（elem, vnode)

### 更新过程

+ 修改 ，触发setter（此前在getter中已被监听）
+ 重新执行render函数，生成newVnode
+ patch(vnode,newVnode)(使用 diff算法 )
+ <img src="/image-20230315153135141.png" alt="image-20230315153135141" style="zoom:67%;" />

### 异步渲染

+ 回顾$nextTick
+ 汇总data的修改，一次性更新视图
+ 减少DOM操作次数，提高性能

总结：

1. 渲染和响应式的关系
2. 渲染和模板编译的关系
3. 渲染和vdom的关系

## 前端路由

### hash的特点

+ hash变化会触发网页的跳转，即浏览器的前进、后退
+ hash变化不会刷新页面，SPA必需的特点
+ hash永远不会提交到server端
+ 可通过window.onhashchange监听hash的变化

### H5 history

+ 用url规范的路由,但表现跟hash一样，但跳转时不刷新页面
+ history.pushState，跳转路由，视图刷新
+ window.onpopstate，浏览器事件，监听浏览器前进后退
+ 需要后端支持

### 两者选择

+ to B的系统推荐用hash，简单易用，对url规范不敏感
+ to C的系统，可以考虑H5 history,但需要服务端支持

### 面试解释原理：

Vue Router 是 Vue.js 官方的路由管理器，利用浏览器的 History API 或者 hash 实现路由切换，避免了多次刷新页面，提高了用户体验。

Vue Router 的实现原理主要包括以下几个方面：

1. 路由匹配： 

   Vue Router 通过定义路由表来配置应用的路由，路由表由一个或多个路由对象组成，每个路由对象包含一个路径和一个组件。当用户在浏览器中输入一个 URL 或者点击应用中的链接时，Vue Router 会根据 URL 解析出路径，然后根据路由表中的路径进行匹配，找到对应的路由对象，并将该路由对象的组件渲染到页面上。

2. 路由切换：

   当用户点击链接或手动输入 URL 时，Vue Router 会根据浏览器的 History API 或者 hash 实现路由切换。在路由切换过程中，Vue Router 会通过监听浏览器的 popstate 事件或者 hashchange 事件来响应路由的变化，并根据新的路由匹配到对应的组件进行渲染。在渲染过程中，Vue Router 会通过创建路由视图组件来动态渲染对应的组件。

3. 路由钩子

   Vue Router 提供了多个路由钩子函数，用于在路由切换的不同阶段执行一些操作，比如验证用户登录状态、跳转到其他页面等。常用的路由钩子函数包括 beforeRouteEnter、beforeRouteUpdate 和 beforeRouteLeave 等。

4. 路由模式

   Vue Router 支持两种路由模式：history 模式和 hash 模式。在 history 模式下，Vue Router 利用浏览器的 History API 来实现路由切换，而在 hash 模式下，则是利用 URL 中的 hash（#）来实现路由切换。默认情况下，Vue Router 采用 hash 模式，可以通过配置路由对象的 mode 属性来切换路由模式。

## Vue真题演练

1. v-show和v-if的区别

   + v-show 通过css的display控制显示与隐藏
   + v-if组件真正的渲染和销毁
   + 频繁切换使用v-show，否则使用v-if

2. 为何在v-for中使用key

   + diff算法中通过tag和key来判断，是不是同一节点，从而复用和重新排序现有元素而不是从头开始渲染。
   + 减少渲染次数，提升渲染性能

3. 描述组件生命周期（父子组件）：请见上文

4. Vue组件如何通讯（常见）

   + 父子组件props和this.$emit
   + 自定义事件 event.$on event.$off event.$emit
   + vuex pinia

5. 描述组件渲染和更新的过程

6. 双向数据绑定v-model的实现原理

   + vue2中：对于普通表单元素或组件，v-model=某属性相当于，将该属性绑定在元素里名叫value的prop中，同时在其input事件事件被触发时，对值进行更新。但是像单选框、复选框等类型的控件，可使用提供的model选项取别名来避免冲突
   + vue3中：将prop名与事件名改为modelValue与update:modelValue，同时支持多个v-model绑定

7. 对mvvm地理解

   在 Vue 中，MVVM 的设计模式主要分为三个部分：

   1. Model：表示数据层，也就是我们的数据模型。在 Vue 中，数据模型通常被定义为 JavaScript 对象，可以包含不同的属性和方法。

   2. View：表示视图层，也就是用户界面。在 Vue 中，视图通常是使用模板语法定义的，可以包含 HTML 标签和 Vue 模板指令。

   3. ViewModel：表示视图模型层，也就是连接数据模型和视图的桥梁。在 Vue 中，视图模型是一个 Vue 实例，它通过绑定数据模型和视图，实现了数据的双向绑定和视图的响应式更新。

      在 Vue 中，视图模型通过监听数据模型的变化来更新视图，同时也可以通过视图更新数据模型。这种双向绑定的特性使得开发者可以更加高效地处理用户交互和数据更新。

8. computed有何特点

   + 缓存，data不会重新计算
   + 提高性能

9. 为何data必须时一个函数

   + 最根本地原因：.vue文件相当于一个类，每一个组件是实例化的对象，data为函数，保证了每个组件的数据不会相互影响

10. ajax请求应该放在哪个生命周期

    1. mounted
    2. js是单线程的，ajax异步获取数据，放在mounted之前没有用，只会让逻辑更加混乱

11. 如何将组件所有props传递给子组件？

    + $props

12. 合适使用异步组件？

    1. 加载大组件（echarts）
    2. 路由异步加载

13. 何时使用keep-alive?

    1. 缓存组件，不需要重复渲染
    2. 如多个静态tab页切换
    3. 优化性能

14. 何时使用beforeDestory

    1. 解绑自定义事件event.$off
    2. 清除定时器
    3. 解绑自定义DOM事件，如window scroll

15. 什么是作用域插槽？

    + 子组件在slot标签中可向插槽出口传递数据，通过子组件标签上的v-slot指令，父组件可接收插槽props对象

16. Vuex中action和mutation有何区别

    1. action中可以处理异步，mutation不可以
    2. action做原子操作
    3. action 可以整合多个mutation

17. Vue常见性能优化方式

    1. 合理使用v-show和v-if
    2. 使用computed
    3. v-for时加key,以及避免和v-if同时使用
    4. 自定义事件，DOM事件即时销毁
    5. 合理使用异步组件
    6. 合理使用keep-alive
    7. data层级不要太深