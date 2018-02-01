---
layout: post
title: "Swift4学习-UiKit的使用（一）"
subtitle: "不断进步"
date: 2018-2-2 00:00:00
author: "Himself65"
header-img: "https://developer.apple.com/swift/images/swift-og.png"
darktheme: true
tags: 
    - Swift4
    - 编程
---
# 前言

最近开始学习iOS编程，看了不少教程

但是我们知道的，Apple一共有5种编程语言，分别是Objective-C、Swift1、Swift2、Swift3和Swift4

所以，为了跟上时代潮流，我这里总结一下各种来路的东西，方便自己和他人查找

## TableView

- 先在故事板中加入一个 TabelViewCell，然后identifier填入内容，不然会报错，之后TabelView的数据源和委托绑定到视图控制器里

- 我们在ViewController加入UITableViewDataSource, UITableViewDelegate时候还没写完他就提醒我们

> Type 'ViewController' does not conform to protocol 'UITableViewDataSource'

实际上**在你把代码全敲完之后就没事了**

例：

``` Swift
extension SecondViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return ans.count
    }
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = (tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)) as UITableViewCell
        cell.textLabel?.text = ans[indexPath.row]
        return cell
    }
}
```

## SearchBar

- 故事板加入SearchBar后委托和原型都绑到视图控制器内

- Cancel按键在故事板中可以打开，无需劳民伤财的在Load()中加入

- 我们在ViewController加入SearchBar的搜索事件时候，我们会写

``` Swift
extension ViewController: UISearchBarDelegate {
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        searchBar.text = ""
        searchBar.endEditing(true)
        tableView.reloadData()
    }
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
    }
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        print(searchText)
        // tabelView的重新显示元素
        tableView.reloadData()
    }
}
```

## UIAlert

iOS弹出框主要由UIAlertController和UIAlertAction组成

UIAlertController ——控制弹框显示的内容

UIAlertAction——点击按钮的交互行为，可以设置多个，声明完成后需要添加到UIAlertController中

例：

``` Swift
private func notice(title: String) {
    let alertController = UIAlertController (title: title, message: "", preferredStyle: .alert)
    self.present(
        alertController,
        animated: true,
        completion: nil)
    // 等待一秒后退出
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 1) {
        alertController.dismiss(animated: false, completion: nil)
    }
}
```

我们可以一开始就扩展到ViewController中，这样方便随时使用

## 偏好设置

视图控制器里面加入

``` Swift
let userStandard = UserDefaults.standard
```

之后

``` Swift
// 读取
count = UserDefaults.standard.integer(forKey: "Name")

// 保存
userStandard.set(count, forKey: "Name")
```

偏好数据保存只能存一些简单的数据结构，自定义类需要其他方式保存

---

持续更新...