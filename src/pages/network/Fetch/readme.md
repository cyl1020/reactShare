# 主题（fetch）

## 1.Response对象的属性

> fetch()请求成功以后，得到的是一个 Response 对象。

1. Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
2. Response.status属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
3. Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
4. Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
5. Response.type属性返回请求的类型。
    * basic：普通请求，即同源请求。
    * cors：跨域请求。
    * error：网络错误，主要用于 Service Worker。
    * Response.redirected属性返回一个布尔值，表示请求是否发生过跳转。（这个没有理解）

## 2.判断请求是否成功

fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

## 3.Response.headers 属性

> 没有理解到

## 4.读取内容的方法

1. response.text()：得到文本字符串。
2. response.json()：得到 JSON 对象。
3. response.blob()：得到二进制 Blob 对象。
4. response.formData()：得到 FormData 表单对象。
5. response.arrayBuffer()：得到二进制 ArrayBuffer 对象。

## 5.fetch()的第二个参数：定制 HTTP 请求

>fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
const response = await fetch(url, {
  method: 'POST', //请求的方式
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  }, //一个对象，用来定制 HTTP 请求的标头
  body: 'foo=bar&lorem=ipsum', //post请求的数据体
});
```

* 提交 JSON 数据

```js
const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch(url, {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```

* 提交表单

```js
const form = document.querySelector('form');

const response = await fetch(url, {
  method: 'POST',
  body: new FormData(form)
})
```

* 文件上传

```js

const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch(url, {
  method: 'POST',
  body: data
});
```

* 直接上传二进制数据

```js
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

let response = await fetch('/article/fetch/post/image', {
  method:  'POST',
  body: blob
});
```

## 6. 同源

> 协议相同 域名相同 端口相同 所谓"同源"指的是"三个相同"
