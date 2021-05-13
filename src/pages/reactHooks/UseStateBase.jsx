import React, { useState } from "react";

/* 
  useState 函数

    1.如果state是一个对象,不可局部更新
    2.useState无论调用多少次，相互之间是独立的。这一点至关重要
    3.setState(obj) 如果obj地址不变，那么React就认为数据没有变化，不会更新视图.
    4.反之 如果obj的内存地址改变了 就会触发更新视图.

  特别的

    1.useState 可以接受一个函数 该函数返回初始state，且只执行一次 .该函数仅在初始渲染时执行
    2.setState 可以接受一个函数 函数的参数是之前的state 返回值是新的state

*/

export default function UseStateBase() {
  const [user, setUser] = useState({
    name: "Curry",
    remark: "yyds",
  });

  const changeUser = () => {
    // setUser不可以局部更新，如果只改变其中一个，那么整个数据都会被覆盖
    // 如果这样写，那么user这个对象会更新为{name: 'cyl'}，remark属性将丢失
    // setUser({
    //   name: "cyl",
    // });

    // 只更新user对象的name属性
    setUser({
      ...user, // 拷贝之前的所有属性
      name: "cyl", //这里的name覆盖之前的name
    });
  };

  //利用initObj对obj赋值
  const initObj = {
    name: "cyl",
  };

  // useState 可以接受一个函数 该函数返回初始state，且只执行一次 .该函数仅在初始渲染时执行
  const [obj, setObj] = useState(() => initObj);

  console.log(obj);

  //setState 可以接受一个函数 函数的参数是之前的state 返回值是新的state
  const [count, setCount] = useState(30);
  const changeCount = () => {
    setCount((oldCount) => {
      let newCount = oldCount + 1;
      return newCount;
    });
    // setCount(count + 1);
  };

  return (
    <div>
      <div>
        <span>{user.name}</span> - <span>{user.remark}</span>
        <button onClick={changeUser}>更新用户信息</button>
      </div>
      <div>
        <span>{count}</span>
        <button onClick={changeCount}>更新数字</button>
      </div>
    </div>
  );
}
