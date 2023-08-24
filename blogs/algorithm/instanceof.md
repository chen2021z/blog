---
title: 函数实现Instanceof
date: 2023/7/7
tags:
 - Instanceof
categories:
 - 算法
---






```typescript
/**
 * 自定义instanceof
 * @param instance 
 * @param origin 
 * @returns 
 */
function myInstanceof(instance: any, origin: any): boolean {
  if (instance == null) return false;

  const type = typeof instance;
  // 如果是值类型，instanceof 直接false
  if (type !== "object" && type !== "function") {
    return false;
  }

  while (instance) {
    if (instance.__proto__ === origin.prototype) {
      return true;
    } else {
      instance = instance.__proto__;
    }
  }
  return false;
}

```

