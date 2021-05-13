import React from "react";
// import currentTime from "../../utils/currentTime";

const newDate = new Date();

//假如在这里我们要显示当前时间，后台返回的是一个时间戳，那么这个时候我们就需要做处理
export default function Helper() {
  const currentTime = (time) => {
    if (!time) return "";
    let date = new Date(time);
    let getMonth =
      date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let getDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let getHours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let getMinutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let getSeconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return (
      date.getFullYear() +
      "-" +
      getMonth +
      "-" +
      getDate +
      " " +
      getHours +
      ":" +
      getMinutes +
      ":" +
      getSeconds
    );
  };

  return <div>currentTime: {currentTime(newDate.getTime())}</div>;
}

//将工具函数抽出去
// export default function Helper() {
//   return <div>currentTime: {currentTime(newDate.getTime())}</div>;
// }

/* 
  总结：应该尽可能的减少组件中的工具方法，而尽量多的把这些方法移出去，把方法依赖的组件内部信息作为参数。
*/
