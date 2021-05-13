import React from "react";

export default function Fetch() {
  //使用fetch 基本的请求
  const base = async () => {
    fetch("http://localhost:3000/base", {
      methods: "GET",
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch()
      .finally(() => console.log("请求结束"));

    const response = await fetch("http://localhost:3000/base", {
      methods: "GET",
    });
    try {
      console.log(response);
      /* 
        ok: true //Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。
        redirected: false //Response.redirected属性返回一个布尔值，表示请求是否发生过跳转。
        status: 200 //Response.status属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。
        statusText: "OK" //Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。
        type: "cors" //Response.type属性返回请求的类型。
        url: "http://localhost:3000/base" //Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。
       */
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //增加判断
  const checked = () => {
    fetch("http://localhost:3000/base", {
      methods: "GET",
    }).then((response) => {
      //这里为什么这样判断？还有没有其他的判断方法？
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
      }
    });
  };

  //result
  const result = () => {
    fetch("http://localhost:3000/error", {
      methods: "GET",
    })
      .then((response) => response.json())
      .then((res) => console.log(res)); //这里会输出什么
  };

  //text
  const text = () => {
    fetch("http://localhost:3000/text", {
      methods: "GET",
    })
      .then((response) => response.text())
      .then((res) => console.log(res));
  }

  return (
    <div>
      <button onClick={base}>使用fetch 基本的请求</button>
      <button onClick={checked}>增加判断</button>
      <button onClick={result}>结果返回什么</button>
      <button onClick={text}>获取文本数据</button>
    </div>
  );
}
