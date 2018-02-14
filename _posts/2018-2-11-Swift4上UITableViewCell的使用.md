---
layout: post
title: "Swift4上UITableViewCell的使用"
subtitle: "全网最新教程（逃"
date: 2018-2-11 15:00:00
author: "Himself65"
header-img: "img/head_post/2018-02-02-01.png"
darktheme: true
tags: 
    - Swift4
    - 编程
    - UiKit
---
# 前言

~~作为一个全新的语言~~，在找UITableView的教程时候十分困难，除了官网之外的地方很少有Swift4的教程，大部分都是Objective-C和几年前的Swift版本，里面官方的库函数已经变化不少，不好直接利用，这个教程也是我来写出UITableVIew和Cell的简单使用方法

官网教程：[Apple Development](https://developer.apple.com/library/content/referencelibrary/GettingStarted/DevelopiOSAppsSwift/ImplementNavigation.html#//apple_ref/doc/uid/TP40015214-CH16-SW1)

有两种方式在一个ViewController中创建控件，一是纯代码、二是GUI故事板，逻辑部分靠代码实现。而在iOS11中更多的是靠第二种来实现，这样美观度和简约度能保持平衡。

## 基本使用

### 故事板部分

我们拖拽一个TableView到故事板里面，然后拖动一个TableViewCell到TableView中，就有了如下的效果

![新建一个TableView](/img/in_post/2018-2-14-01.PNG)

之后，我们就能看到一堆属性，可以在这里设置，这里就不描述了

![属性](/img/in_post/2018-2-14-02.PNG)

![属性](/img/in_post/2018-2-14-03.PNG)

唯一要注意的是，我们必须要写Cell中的Identifier，把他标记，然后在写代码中才可以找到

### 代码部分

我们在此页面绑定的ViewController中编写代码

``` swift
@IBOutlet weak var tableView: UITableView!
var info = Array<String>()
```

首先把故事板中的控件绑到代码中,***dataSource属性也需要绑定*，否则运行起来就崩了

![注意：dataSource也需要绑定，不然会报错](/img/in_post/2018-2-14-05.PNG)

然后创建一个数组，用于保存TB（TableView的简称，下同）中的数据

而我们调用Cell，则是用我们刚才在Identifier中写的字符串，先扩展UITableView，**注意，这三个函数未实现之前会一直报错**

``` swift
extension ViewController: UITableViewDataSource {
    // 表示每组数据的大小
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return info.count
    }
    // 表示有几组数据，这里我们只需要一组
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    // 显示每个数据，这里的"cell"是用的是Identifier中写的
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        cell?.textLabel?.text = info[indexPath.row]
        return cell!
    }
}
```

那么我们写几个数据看看效果，**注意，我们在更新数据之后要重新加载一次TB**

``` swift
override func viewDidLoad() {
    super.viewDidLoad()
    info.append("fuck")
    info.append("gs")
    info.append("shit")
    tableView.reloadData()
}
```

![效果](/img/in_post/2018-2-14-04.jpeg)

## 高级部分（委托）

### 动态数据的实现

如果需要数据持久化，那么我们可能需要**CoreData**，但是本篇不阐述这个，有时间单独拿出来说一下

我们在STB（StoryBoard，下同）中新建一个输入框和按钮，然后在代码中绑定实体

![如图](/img/in_post/2018-2-14-06.PNG)

``` swift
@IBOutlet weak var textField: UITextField!
@IBOutlet weak var button: UIButton!
......
@IBAction func save() {
    info.append(textField.text!)
    tableView.reloadData()
}
```

### 右滑数据删除的实现

扩展UITableViewDelegate,**注意需要绑定，不然加载时报错**

``` swift
extension ViewController: UITableViewDelegate {
    // 是否可以编辑
    func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    // 删除的委托
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            info.remove(at: indexPath.row)
            tableView.beginUpdates()
            tableView.deleteRows(
                at: [indexPath], with: .fade)
            tableView.endUpdates()
        }
    }
}
```

![如图](/img/in_post/2018-2-14-07.PNG)

![如图](/img/in_post/2018-2-14-08.PNG)

## 技巧

扩展触摸委托来让按下屏幕空白处时候取消键盘

``` swift
extension UIViewController {
    override open func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
}
``