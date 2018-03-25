---
layout: post
title: "luogu用户爬取-Python3爬虫"
subtitle: "一周的成功"
date: 2018-3-25 15:00:00
author: "Himself65"
header-img: "img/head_post/2018-3-17-01.jpg"
darktheme: true
tags: 
    - 编程
    - Python3
    - 爬虫
---
# 成果

用Python3爬了将近12个小时之后，终于得到了洛谷前九万用户的资料

截止今日12时左右

前100AC率的分别是：

## 名字	  总提交数   AC数

1.	Khassar	3.8K	1.4K
2.	jzqjzq	3K	1.1K
3.	Youngsc	3.3K	1.1K
4.	Fheiwn	3.3K	1.1K
5.	MloVtry	3.5K	1.1K
6.	JACKLOVETHREE	4K	1.1K
7.	Heartbeat666	3.1K	1K
8.	Pine	3.2K	995
9.	Timothy	3.4K	943
10.	雨季	2.7K	874
11.	Fowany	1.9K	869
12.	zqy1018	1.9K	822
13.	2014程思浩	3.3K	813
14.	zhi_009	1.2K	812
15.	cxy004	3.3K	803
16.	沧澜	2.2K	784
17.	communist	2K	771
18.	Kelin	3.5K	769
19.	向金牌冲刺	4.3K	764
20.	BFSBFSBFSBFS	1.8K	757
21.	曦月__OFN	2.3K	745
22.	颜伟业_C_Asm	2.2K	741
23.	_小妖	2.4K	740
24.	ysner	2.6K	726
25.	飞翔	2.4K	725
26.	noi031	2.7K	722
27.	dtcxzyw	2.7K	708
28.	rushcheyo	2.4K	707
29.	巨型方块	2.3K	706
30.	Sooke	1.4K	696
31.	never_see	4.4K	696
32.	曾豪哥	2.3K	693
33.	殷跃然	1.9K	688
34.	_23333	1.5K	682
35.	Just_do_it	1.6K	681
36.	守望	2.9K	681
37.	远航之曲	2.1K	665
38.	悠悠我昕	2.4K	663
39.	Night_Aurora	4.4K	659
40.	zht467	3K	657
41.	未晞	2.4K	656
42.	YoungNeal	1.6K	654
43.	zhzh2001	1.4K	647
44.	XiXi	1.1K	646
45.	Mychael	2.1K	642
46.	charlie003	2K	641
47.	yybyyb	1.6K	633
48.	2016c01	2.5K	632
49.	Captain_Paul	2K	630
50.	浮尘ii	1.9K	629
51.	Fire_Storm	2.1K	626
52.	xiwang	1.2K	625
53.	cheliang	1.1K	622
54.	JOHNKRAM	1.6K	616
55.	NaVi_Awson	1.6K	616
56.	chauchat	1.3K	615
57.	租酥雨	1.2K	612
58.	huangxuanao	3.3K	609
59.	Hjl1777	1.1K	605
60.	wxgwxg	2.4K	604
61.	fastle	2K	593
62.	Excim	1.4K	592
63.	Anoxiacxy	2.1K	590
64.	hsfzLZH1	2K	587
65.	曹彦臣	1.3K	585
66.	浮云启心	1.7K	584
67.	陶文祥	1.3K	580
68.	li20082008li	1.9K	579
69.	lbn187	914	576
70.	封癫	2.7K	576
71.	Victorique	2.8K	576
72.	Trick_t	1.9K	574
73.	至尊无敌	1.1K	572
74.	Position	1.6K	572
75.	shengmingkexue	1.4K	571
76.	LJC00118	2K	569
77.	DDOSvoid	2.9K	569
78.	Forever丶CIL	1.4K	568
79.	太阳之神2015	1.8K	565
80.	九指客	1.4K	564
81.	void_zxh	2K	562
82.	soler	2.2K	562
83.	Liang__Shine__Sky	1.8K	556
84.	2014张子韫	2.7K	556
85.	BLMontgomery	1.7K	554
86.	v天下第柒v	1.9K	554
87.	dengyixuan	2.6K	553
88.	boynextdoor	1.6K	552
89.	zj余能	1.6K	552
90.	jjikkollp	2.7K	552
91.	sxyugao	927	551
92.	若依若风	1.2K	548
93.	暴躁的蒟蒻	2K	547
94. 小年轻w	1.3K	544
95.	zby2001	1.6K	544
96.	functionendless	1.9K	544
97.	斯德哥尔摩	1.7K	543
98.	zhouenji	1.8K	541
99.	zhoudong	1.2K	534
100.	wine	1.5K	533

OneDrive链接：

[Link](https://1drv.ms/x/s!AkamOYfLSizOuiKzj3dhipNdZBqN)

代码实现

下载最麻烦的不是算法上（就是个遍历uid），而是时间上……

第一次只用了一个线程，抓取、筛选、下载一气呵成，但是时间上…………大概一晚上只能1w左右的内容。

之后用了多线程，又发现会抢资源，于是又单独开了读取线程和保存线程，经过一番修改才稳定一晚上下载完毕。

基本的原理如下（PPT制作）：

详细可以去看GitHub，写的不算杂乱：

[项目地址](https://github.com/Himself65/LuoguCrawler)

这个坑差不多花了几十个小时填完，其实大部分时间都是在爬数据（逃

发布于 15:30