---
title: 括号匹配
date: 2023/6/1
tags:
 - Match Bracket
categories:
 - 算法
---

## 括号匹配，匹配一个字符串是否括号匹配{a{b[c]d}()}

```typescript
function match(str: string): boolean {
  const stack: string[] = [];
  const leftSymbols = "([{";
  const rightSymbols = ")]}";

  for (let i = 0; i < str.length; i++) {
    let tem = str[i];
    if (leftSymbols.includes(tem)) {
      // 压栈
      stack.push(tem);
    } else if (rightSymbols.includes(tem)) {
      // 判断栈顶
      let top = stack[stack.length - 1];
      if (
        (tem === ")" && top === "(") ||
        (tem === "]" && top === "[") ||
        (tem === "}" && top === "{")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
const str = '()2([4()[]3){}'
console.log(match(str));
```

​	