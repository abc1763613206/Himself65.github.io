---
layout: post
title: "Swift4学习-UiKit的使用（二）"
subtitle: "明天tm期末考试"
date: 2018-2-2 00:00:00
author: "Himself65"
header-img: "img/head_post/2018-02-02-01.png"
darktheme: true
tags: 
    - Swift4
    - 编程
    - UiKit
---
# 前言

这里是有关**UIAlertViewController**的内容

## UIAlertViewController

### Swift弹出提示框

系统提供两种样式可供选择，一种是Alert，在一种是AlertSheet

今天我用的Alert实现代码

``` Swift
// 习惯这么写
struct ActionContent {
    var title: String
    var style: UIAlertActionStyle
    var handler: ((UIAlertAction) -> Void)?
}
@discardableResult
static func alertAction(_ title: String, message: String, style: UIAlertControllerStyle, leftContent: ActionContent, rightContent: ActionContent) -> UIAlertController {
    let alertController = UIAlertController(title: title, message: message, preferredStyle: style)
    let leftAction = UIAlertAction(title: leftContent.title, style: leftContent.style, handler: leftContent.handler)
    let rightAction = UIAlertAction(title: rightContent.title, style: rightContent.style,handler: rightContent.handler)
    alertController.addAction(leftAction)
    alertController.addAction(rightAction)
    return alertController
}


```

然后我们就这么添加,可以实现删除所有用户设置之前提醒是否删除

``` Swift
    let alert = alertAction("你确定要删除所有设置吗？", message: "真的吗？", style: .alert, leftContent: ActionContent(title: "取消", style: .cancel, handler: nil), rightContent: ActionContent(title: "确定", style: .default, handler: {clickHandler in
        let dic = self.userStandard.dictionaryRepresentation()
        for item in dic {
            self.userStandard.removeObject(forKey: item.key)
        }
        self.userStandard.synchronize()
        self.reShow()
    }))
    self.present(alert, animated: true, completion: nil)
    }
```

今天就写了这么多，md明天考试去