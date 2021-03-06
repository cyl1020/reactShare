# 主题（ajax）

## 1.什么是 ajax？

1. Ajax = 异步 JavaScript 和 XML。
2. Ajax 是一种用于创建快速动态网页的技术。
3. 通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
4. 传统的网页（不使用 Ajax）如果需要更新内容，必需重载整个网页面

> 1. XML 指可扩展标记语言（EXtensible Markup Language）
> 2. XML 的设计宗旨是传输数据，而非显示数据
> 3. HTML 旨在显示信息，而 XML 旨在传输信息。

## 2.ajax 的基本使用

1. 建立 XMLHttpRequest 对象；
2. 使用 open 方法与服务器建立连接；
3. 向服务器端发送数据（请求）；
4. 在回调函数针对不同响应状态进行处理；

## 3. XMLHttpRequest对象的属性

> XMLHttpRequest是ajax的核心机制。

1. onreadystatechange 每次状态改变所触发事件的事件处理程序。
2. responseText 从服务器进程返回数据的字符串形式。
3. responseXML 从服务器进程返回的DOM兼容的文档数据对象。
4. status 从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
5. status Text 伴随状态码的字符串信息
6. readyState 对象状态值
    * `0` (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
    * `1` (初始化) 对象已建立，尚未调用send方法
    * `2` (发送数据) send方法已调用，但是当前的状态及http头未知
    * `3` (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，
    * `4` (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据

## 4.常见的http请求状态码

  1. 200: '服务器成功返回请求的数据。'
  2. 201: '新建或修改数据成功。'
  3. 202: '一个请求已经进入后台排队（异步任务）。'
  4. 204: '删除数据成功。'
  5. 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。'
  6. 401: '用户没有权限（令牌、用户名、密码错误）。'
  7. 403: '用户得到授权，但是访问是被禁止的。'
  8. 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。'
  9. 406: '请求的格式不可得。'
  10. 410: '请求的资源被永久删除，且不会再得到的。'
  11. 422: '当创建一个对象时，发生一个验证错误。'
  12. 500: '服务器发生错误，请检查服务器。'
  13. 502: '网关错误。'
  14. 503: '服务不可用，服务器暂时过载或维护。'
  15. 504: '网关超时。'
