---
layout: post
title: "在macOS上创建SSL网站"
subtitle: "硬核教程"
date: 2018-4-4 9:00:00
author: "Himself65"
header-img: "img/head_post/2018-4-3-01.jpeg"
darktheme: false
tags: 
    - 编程
    - macOS
    - 翻译
---
# 在macOS上创建SSL网站

**文章翻译**自[GitHubGist](https://gist.github.com/jonathantneal/774e4b0b3d4d739cbc53)

本篇教程带你完成本地设置，在自己的电脑上搭建可信的网站（就是Chrome地址的绿色锁）

本篇教程的指令是基于macOS Sierra，但是在之前的版本依然适用（El Capitan, Yosemite, Mavericks, and Mountain Lion）

**NOTE**: 你可以将编辑器换成nano、vim或者任何你喜欢的编辑器。但是个人而言，我喜欢Sublime Text。

## 配置Apache

打开终端，启动Apache

```bash
sudo apachectl start
```

打开浏览器，访问[http://localhost](http://localhost)。你能看到上面写着**It wordks!**

### 配置Apache————设置虚拟主机

打开终端，编辑Apache 配置文件

```bash
edit /etc/apache2/httpd.conf
```

在编辑器中，替换第212行来禁止服务器关于完全限定域名的有关消息

```bash
ServerName localhost
```

然后，取消注释 160行 和 499行，启用虚拟主机。

```bash
LoadModule vhost_alias_module libexec/apache2/mod_vhost_alias.so
```

``` bash
Include /private/etc/apache2/extra/httpd-vhosts.conf
```

如果需要，取消注释169行来启动PHP

```bash
LoadModule php5_module libexec/apache2/libphp5.so
```

在终端内编辑虚拟主机配置

```bash
edit /etc/apache2/extra/httpd-vhosts.conf
```

在编辑器里，用一下内容来替换掉全部文本，用您的用户名替换indieweb

```bash
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot "/Users/indieweb/Sites/localhost"

    <Directory "/Users/indieweb/Sites/localhost">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
```

用终端，启动Apache

```bash
sudo apachectl restart
```

### 配置Apache————创建网站

用终端，创建一个站点父目录和localhost子目录，这就是我们的新站点

```bash
mkdir -p ~/Sites/localhost
```

接下来，我们在localhost中创建一个HTML测试文档

```bash
echo "<h1>localhost works</h1>" > ~/Sites/localhost/index.html
```

现在，我们在浏览器中访问[http://localhost](http://localhost)，你应该会看到一个标题写着**localhost works.**

## 配置SSL

通过终端，创建一个SSL文件夹

```bash
sudo mkdir /etc/apache2/ssl
```

然后，为我们的网站生成一个私钥和证书

```bash
sudo openssl genrsa -out /etc/apache2/ssl/localhost.key 2048
sudo openssl req -new -x509 -key /etc/apache2/ssl/localhost.key -out /etc/apache2/ssl/localhost.crt -days 3650 -subj /CN=localhost
```

之后，我们把证书添加到钥匙串访问中

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /etc/apache2/ssl/localhost.crt
```

### 配置SSL————设置可信任的虚拟主机

用终端编辑Apache 配置文件

```bash
edit /etc/apache2/httpd.conf
```

用编辑器取消注释第89行和143行，启动https所需模块

```bash
LoadModule socache_shmcb_module libexec/apache2/mod_socache_shmcb.so
```

```bash
LoadModule ssl_module libexec/apache2/mod_ssl.so
```

接下来，取消注释516行启动“可信任主机”

```bash
Include /private/etc/apache2/extra/httpd-ssl.conf
```

回到终端，编辑虚拟主机配置

```bash
edit /etc/apache2/extra/httpd-vhosts.conf
```

编辑器里，在文末添加443虚拟主机和localhost指令，用您的用户名替换indieweb

```bash
<VirtualHost *:443>
    ServerName localhost
    DocumentRoot "/Users/indieweb/Sites/localhost"

    SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile /etc/apache2/ssl/localhost.crt
    SSLCertificateKeyFile /etc/apache2/ssl/localhost.key

    <Directory "/Users/indieweb/Sites/localhost">
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
```

回到终端，编辑SSL 配置文件

``` bash
edit /etc/apache2/extra/httpd-ssl.conf
```

下一步，注释114和154行跳过默认的服务器证书和服务器私钥

```bash
SSLCertificateFile "/etc/apache2/ssl/localhost.crt"
```

```bash
SSLCertificateKeyFile "/etc/apache2/ssl/localhost.key"
```

最后的最后，我们来到终端开启Apache

```bash
sudo apachectl restart
```

在浏览器中，我们访问[http://localhost](http://localhost)。该网页可信赖，而且您应看到一条信息说明你的网站正常运行

---

## 其他

在评论中，有的网友指出该方法有些问题，他的配置文件是这么写的

```bash
<VirtualHost *:80>
  ServerName localhost
  DocumentRoot "/Users/tony/Sites"
   <Directory "Users/tony/Sites">
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>

<VirtualHost *:80>
  ServerName localhost
  DocumentRoot "/Users/tony/Sites"
  SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile /etc/apache2/ssl/localhost.crt
    SSLCertificateKeyFile /etc/apache2/ssl/localhost.key
  <Directory "Users/tony/Sites">
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>

<VirtualHost *:443>
  ServerName localhost
  DocumentRoot "/Users/tony/Sites"
  SSLEngine on
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLCertificateFile /etc/apache2/ssl/localhost.crt
    SSLCertificateKeyFile /etc/apache2/ssl/localhost.key
  <Directory "Users/tony/Sites">
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>
```