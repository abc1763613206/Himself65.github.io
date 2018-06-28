---
layout: post
title: "git下合并多次commit"
subtitle: ""
date: 2018-6-28 10:00:00
author: "Himself65"
header-img: "img/head_post/2018-4-5-01.jpg"
tags: 
    - Github
    - 编程
---
# 背景

我几天不断写+改一个文件代码，最终写好之后需要我们pull request，但是如果我们直接pr，那么如果对方直接merge就会产生一堆无用的history

## 操作方法

``` bash
git rebase -i HEAD~3 # 压缩前3次commit
```

之后会出现一个文件，前几行大概是这样的

```bash
pick dgajfbv2 finish
pick adahvay7 fixed bugs
pick afsdfadd update
```

然后我们改为

```bash
pick dgajfbv2 finish
squash adahvay7 fixed bugs
squash afsdfadd update
```

保存退出，然后添加一下修改好的

```bash
git add .
git rebase --continue
```

这时候会弹出你之前commit信息合并后的内容，我们也将它修改成正常人能看懂的

\#please开始的都是注释，我们不用删掉

```bash
finished task: gaoshi

# Please enter ...
...
```

我们同步到远程仓库，直接push会被拒绝，所以我选择强制push（有风险

```bash
git push -f
```

以上。