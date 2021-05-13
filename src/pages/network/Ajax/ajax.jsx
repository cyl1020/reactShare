import React from "react";

export default function Ajax() {
  //最基本的请求
  const baseGet = () => {
    //发送Ajax的步骤
    let parma = "username=张三";
    //第一步： 创建XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    //第二步 准备发送 调用open方法 (有三个参数) 拼接数据
    //encodeURI() 函数可把字符串作为 URI 进行编码
    xhr.open("GET", "http://localhost:3000/base?" + encodeURI(parma), true);
    //第三步 发送 调用send方法
    xhr.send(null); //get请求 为null
    //第四步处理请求 绑定事件onreadystatechange
    xhr.onreadystatechange = function () {
      // 状态为4 表示收到数据
      if (xhr.readyState === 4) {
        //状态码为 200 表示数据完整
        if (xhr.status === 200) {
          //接收并处理数据
          var rel = xhr.responseText;
          //接收的是json数据   使用JSON.parse()转为js对象
          console.log("GET: " + JSON.parse(rel).msg);
        }
      }
    };
  };

  const basePost = () => {
    //发送Ajax的步骤
    let parma = "username=张三";
    //第一步： 创建XMLHttpRequest对象
    let xhr = new XMLHttpRequest();
    //第二步 准备发送 调用open方法 (有三个参数) 拼接数据
    xhr.open("POST", "http://localhost:3000/base?", true);
    //第三步 发送 调用send方法
    //设置Content-Type
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(parma); //get请求 为null
    //第四步处理请求 绑定事件onreadystatechange
    xhr.onreadystatechange = function () {
      console.log("onreadystatechange:" + xhr.readyState); //需要判断ajax状态码
      // 状态为4 表示收到数据
      if (xhr.readyState === 4) {
        //状态码为 200 表示数据完整
        if (xhr.status === 200) {
          //接收并处理数据
          var rel = xhr.responseText;
          //接收的是json数据   使用JSON.parse()转为js对象
          console.log("POST: " + JSON.parse(rel).msg);
        }
      }
    };
  };

  //获取服务器响应的另一种方式
  const onload = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/base", true);
    xhr.send(null);
    xhr.onload = () => {
      console.log("onload:" + xhr.readyState); //不需要判断ajax状态码
      console.log("获取服务器响应的另一种方式：onload");
    };
  };

  //超时的请求
  const timeOut = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/timeout", true);
    xhr.send(null);
    xhr.timeout = 1000; //设置超时时间为1s
    xhr.ontimeout = () => {
      console.log("请求超时了");
    };
  };

  // 当网络中断时会触发onerrr事件
  const error = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/error", true);
    xhr.send(null);
    xhr.onerror = () => {
      console.log("请求出错了");
    };
  };

  return (
    <div>
      <button onClick={baseGet}>最基本的get请求</button>
      <button onClick={basePost}>最基本的post请求</button>
      <button onClick={onload}>获取服务器响应的另一种方式</button>
      <button onClick={timeOut}>超时的请求</button>
      <button onClick={error}>请求出现错误</button>
    </div>
  );
}
