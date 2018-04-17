---
layout: post
title: "JavaScript的异步编程（二）"
subtitle: "填坑"
date: 2018-4-5 00:50:00
author: "Himself65"
header-img: "img/head_post/2018-4-5-01.jpg"
darktheme: false
tags: 
    - 编程
    - JavaScript
---
# 回顾上篇

上回说到，我们分别实现了简单的生成器和简单的Promise。

如果我们把这两者结合起来，就成了这个样子

``` JavaScript
    async (function* () {
    const name1 = yield getTask('Himself65');
    const name2 = yield getTask('Himself66');
    const name3 = yield getTask('Himself67');
    });

    function async (generator) {
    var iterator = generator();

    // function to do the Task
    function handle(iteratorResult) {
        if (iteratorResult.done) {
        return;
        }
        const iteratorValue = iteratorResult.value;
        if (iteratorValue instanceof Promise) {
        iteratorValue.then(handle(iterator.next()))
            .catch(err => iterator.throw(err));
        }
    }

    handle(iterator.next());
    }
```

![效果如下](/img/in_post/2018-4-5-01.PNG)

---

其中，Promise帮助我们执行异步代码（不会因为耗时而暂停），生成器好像任务队列的存在。

样例代码放在[GitHub](https://github.com/Himself65/CodeLibrary/blob/master/JavaScript/01.html)