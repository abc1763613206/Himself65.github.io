---
layout: post
title: "JavaScript的异步编程（一）"
subtitle: "几天摸鱼的成果"
date: 2018-4-4 2:00:00
author: "Himself65"
header-img: "img/head_post/2018-4-3-01.jpeg"
darktheme: true
tags: 
    - 编程
    - JavaScript
---
# JavaScript异步编程

如果在函数A返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。

## 脚手架的搭建

我们写出一个简单的  页面和测试框架，来完成本页和之后我们所有 JavaScript（之后称 JS，或 js）的编写。

```html
<html>

<head>
  <meta charset="utf-8" />
</head>

<body>
  <ul id="results">
  </ul>
</body>

<script>

  window.onload = function () {
    assert(true, 'shit');
    assert(false, 'noooo!');
  }

  function assert(value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.getElementById("results").appendChild(li);
  }
</script>

<style>
  #results li.pass {
    color: green
  }

  #results li.fail {
    color: red
  }
</style>

</html>
```

![效果如下](/img/in_post/2018-4-3-01.PNG)

这样，我们每次写完的代码只要简单的调用 assert 便可直接获得结果

## 生成器

生成器的运行步骤：

- 当我们创建了一个生成器之后，它开始挂起，其中的代码都为未执行

- 执行开始，要么是从第一行开始，要么是从上一个挂起阶段继续。当调用next()时且还有代码，生成器都会转移到这个状态。

- 挂起让渡，当遇到yield表达式，它会创建一个包，包含返回值的新对象，随后再挂起，生成器在这个时候状态暂停并等待继续执行。

- 完成，当到return或者代码全部执行，生成器进入该状态。

我们通过一个例子

``` JavaScript
function* getName(action) {
    yield "Himself65" + action;
    return "Himself66" + action;
  }

  window.onload = function () {
    const iterator = getName("Yang");
    const result1 = iterator.next();
    const result2 = iterator.next();
    assert(true, result1.value)
    assert(true, result2.value)
  }
```

![效果如下](/img/in_post/2018-4-3-02.PNG)

标准函数仅仅会被重复调用，每次调用时都会创建一个新的上下文，而生成器则会暂时挂起并等到恢复。

总之，生成器的上下文一直都是保存的，所以根据这一点，我们有了执行异步编程的好东西。

## Promise

如果我们计算一个耗时的（比如服务器获取信息，网速慢的情况下会很慢），我们如果用正常代码来写，并且Javascript的单线程模型，可能会导致整个程序暂停，仅仅是为了计算可能并不重要的东西。

``` JavaScript
var promise1 = new Promise((resolve, reject) => {
  report("Promise1 Start")
  setTimeout(() => {
    report("Resolving promise1")
    resolve("Promise resolve 1")
  }, 500)
})

assert(promise1 !== null, '已经创建promise1')

promise1.then(something => {
  assert(something === "Promise resolve 1", "Get Promise resolve 1")
})

const promise2 = new Promise((resolve, reject) => {
  report("Promise2 Start")
  resolve("Promise resolve 2")
})

promise2.then(something => {
  assert(something === "Promise resolve 2", "Get Promise resolve 2");
})

report("END CODE")
```

效果如图，Promise的作用显而易见

![效果如下](/img/in_post/2018-4-3-03.PNG)

下一节，我会继续写两个关键字的组合用法