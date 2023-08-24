---
title: 字符大小写切换
date: 2023/7/13
tags:
 - Custom New
categories:
 - 算法
---



## Switch letter Case



```typescript
/**
   * 1.使用正则
   * @param str 
   * @returns 
   */
  function switchCase1(str: string): string{
    let res = ''
    const reg1 = /[a-z]/
    const reg2 = /[A-Z]/
    for(let i = 0; i < str.length; i++){
      if(reg1.test(str[i])){
        res += str[i].toUpperCase()
      }else if(reg2.test(str[i])){
        res += str[i].toLowerCase()
      }else{
        // 其他字符
        res += str[i]
      }
    }

    return res
  }

  // console.log(switchCase1('1abCD2'));


  /**
   * 通过ASCII charCodeAt判断
   * @param str 
   */
  function switchCase2(str: string):string{
    let res = ''
    for(let i = 0; i < str.length; i++){
      let code = str.charCodeAt(i)
      if(code  >= 65 && code <= 90){
        res += str[i].toLowerCase()
      }else if(code  >= 97 && code <= 122){
        res += str[i].toUpperCase()
      }else{
        // 其他字符
        res += str[i]
      }
    }

    return res
  }
```

