import React, { useContext, createContext, useState } from "react";

/* 

  概念

    它就像一种为了子树准备的全局变量

  使用方法

    1.使用 createContext 创建上下文 上下文可以是 函数 对象等复杂数据
    2.使用 Provider 提供上下文
    3.在作用域内使用 useContext 使用上下文

*/

//使用createContext创建上下文
const context = createContext(0); //0是context的初始值

export default function UseContext() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <context.Provider value={{ count, setCount }}>
        <div>我是提供者{count}</div>
        <User />
      </context.Provider>
    </div>
  );
}

function User() {
  //使用useContext获取根组件的分享
  const { count } = useContext(context);

  return (
    <div>
      <div>我是使用者{count}</div>
      <UserChild />
    </div>
  );
}

function UserChild() {
  //使用useContext获取根组件的分享
  const { count, setCount } = useContext(context);

  return (
    <div>
      <div>我是使用者的孩子{count}</div>
      <button onClick={() => setCount(count + 1)}>
        使用者的孩子更新根组件的count
      </button>
    </div>
  );
}
