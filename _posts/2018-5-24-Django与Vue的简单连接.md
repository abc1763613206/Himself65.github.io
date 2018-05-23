---
layout: post
title: "Django与Vue的简单连接"
subtitle: "一个月来的结果"
date: 2018-5-24 1:00:00
author: "Himself65"
header-img: "img/head_post/2018-4-5-01.jpg"
tags: 
    - 编程
    - JavaScript
    - Python
    - Vue.js
    - Django
---
# 背景

本人写的VueWeb（暂未命名）经过半个多月的啃教程和学习也如火如荼(cha)的进入了开发阶段。

[前端部分](https://github.com/Himself65/VueWeb)、[后端部分](https://github.com/Himself65/VueWeb-Backend)

学了学数据库和网页开发，Django和Vue.js也进入了进阶部分，再次我也感谢[Darkflames](https://www.luogu.org/space/show?uid=51185)给我的一些思路

Vueweb采用前后端分离的开发方式，这样前后端互不冲突，后端抽象出api供前端即可食用。这样提高了不少的效率。而且一开始写不分离的时候发现Vuejs需要即时预览的时候就很难受了。具体参考文章[前后端分离的思考与实践](http://taobaofed.org/blog/2014/04/05/practice-of-separation-of-front-end-from-back-end/)

## Django部分

注意：

1. **本文章不适合纯小白，请起码阅读完官方文档的教程部分**

2. 内容尽量压缩，如果需要学习请到我的项目查看源代码

我们需要的几个插件

> PyMySQL 连接本地MySql部分
>
> djangorestframework 提供api支持
>
> django-cors-headers 提供跨域访问支持

然后我们在我们的后端项目新建一个App，起名blog（事实上我就是这么写的）

然后在models.py内加入新的model

``` Python3
from django.contrib.auth.models import User
class Article(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    created_time = models.DateField(auto_now_add=True)
    update_time = models.DateField(auto_now=True)
    def __str__(self):
        return self.title
```

``` Python3
from rest_framework import serializers
class ArticleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
```

同时还有序列化生成器和视图部分

``` Python3
from .serializer import ArticleSerializers
from .models import Article
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializers
```

这里我们使用rest_framework自动生成的post和get方法

最后我们和数据库同步，然后runserver

![preview](/img/in_post/2018-5-24-01.png)

![随便添加了一个数据](/img/in_post/2018-5-24-02.png)

## Vue部分

我们需要的是**axios**来进行跨域访问

创建一个api.js

``` JavaScript
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export default {
  getArticlesByID (id) {
    return ajax(`article/${id}`, 'get', {})
  },
  getAllArticles () {
    return ajax('article/', 'get', {})
  }
}
function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url, method, params, data
    }).then(res => {
      // CHECK IF status===20x
      if (res.data.error) {
        reject(res)
      } else {
        resolve(res)
      }
    })
  })
}
```

然后在.vue中添加访问api的方法

``` JavaScript
data: () => {
    api.getAllArticles().then(res => { this.articles = res }
    )
    return ({
      articles: []
    })
  },
```

![效果](/img/in_post/2018-5-24-03.png)

然后我们用v-for显示出内容，这里我暂时就不写了（太懒）