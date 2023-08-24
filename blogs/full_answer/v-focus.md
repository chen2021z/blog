---
title: 实现一个自定义 vue 指令 v-focus，功能是自动聚焦
date: 2023/6/1
tags:
 - v-focus
categories:
 - Vue
---

```vue
<template>
  <input v-focus>
</template>

<script>
export default {
  directives: {
    focus: {
      // 指令的定义
      inserted(el) {
        // 元素插入到 DOM 后设置焦点
        el.focus();
      },
      update(el, binding) {
        // 当指令所在组件的 VNode 更新时可能会调用 update 钩子函数
        // 可以根据需要来判断是否要设置焦点
        if (binding.value !== binding.oldValue) {
          el.focus();
        }
      },
      unbind(el) {
        // 当指令与元素解绑时调用
        // 可以在此处执行一些清理工作（如果需要）
      }
    }
  }
}
</script>
```
