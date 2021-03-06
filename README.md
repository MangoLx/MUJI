# MUJI（仿写）



## 目录
* [背景介绍](#背景介绍)
* [项目介绍](#项目介绍)
* [使用说明](#使用说明)
  * [页面使用](#页面使用)
  * [获取代码](#获取代码)

## 背景介绍

*MUJI*，以"物有所值"为宗旨并研发出各种价廉物美商品的無印良品，本次旨在仿照该网站进行JavaScript的电商网站开发。

*JavaScript*，是一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为JavaScript引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。

*jQuery* , jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨是“write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

*requirejs* , RequireJS 是一个JavaScript模块加载器。它非常适合在浏览器中使用，但它也可以用在其他脚本环境，就像 Rhino and Node。使用RequireJS加载模块化脚本将提高代码的加载速度和质量。

*gulp* , 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。

## 项目介绍

*功能说明*，包含基本的电商购买流程
1. 登录注册功能
    ​		使用php作为后端语言、MySQL作为开发数据库完成用户登录注册功能实现

2. 主页功能
    ​		使用rap2数据接口，实现主页相关商品列表渲染。同时使用JavaScript实现主页界面的轮播图、推荐商品左右切换等交互效果的实现。点击商品进入详情页面

3. 列表页功能
    ​		使用rap2数据接口，实现主页相关商品列表渲染。以及点击商品进入商品详情页

4. 详情页功能
    ​		使用rap2数据接口，根据点击发送的id值向接口发送请求，获取相应商品信息进行页面渲染

5. 购物车功能

    ​		点击编辑可以增加、减少数量，删除可删除商品，去结算将勾选的商品调到结算页面进行结算


## 使用说明
	下载github上的源文件，使用npm下载所需工具包，之后使用gulp构建后在浏览器输入<http:localhost:10000>进行访问

### 页面使用

#### 主页使用
* 导航栏的登录注册链接到登录注册页面，搜索框使用百度接口模拟搜索显示，点击购物车进入购物车界面
* 轮播图左右切换以及按钮切换，鼠标移入左右按钮出现且轮播停止
* 新到商品以及推荐商品点击可以进入商品详情页面

#### 登录注册页面使用
* 注册界面会验证信息合法性，如果有未输入的输入框则不能点击注册按钮，成功之后会在两秒后跳转登录界面
* 登录界面验证登录信息，成功在两秒后跳转主页

#### 列表页（食品列表）
* 点击商品进入详情页面
* 点击按价格排序进行排序（未来计划开发功能）

#### 商品详情页面使用
* 点击图片出现放大图片且整个网页有蒙版，任意点击别处消失
* 查看商品详细信息
* 点击添加购物车，下方出现添加商品框，可以更改数量
* 点击确定出现抛物线动画，提示商品添加成功

#### 购物车页面使用
* 点击编辑按钮可以对添加的商品的数量进行编辑，也可以点击删除商品
* 点击多选框选择是否选中商品，动态计算价格和数量
* 点击去结算按钮，可以将勾选的商品添加订单页

### 获取代码

* github项目主页: <https://github.com/MangoLx/MUJI>
* github上的会持续更新。