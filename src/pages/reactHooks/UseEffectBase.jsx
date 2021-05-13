import React, { useState, useEffect } from "react";

/* 
  useEffect 副作用

  概念

    1.对环境的改变即为副作用，如修改 document.title
    2.但我们不一定非要把副作用放在 useEffect 里面
    3.实际上叫做 afterRender 更好，每次render后执行
    4.如果同时存在多个 useEffect， 会按照出现次序执行

*/

export default function UseEffectBase() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);

  // 任何一个state改变时触发(不传第二个参数)
  useEffect(() => {
    console.log("count更新了" + count);
  });

  // 作为 componentDidMount 使用，[ ] 作第二个参数
  useEffect(() => {
    console.log("我相当于componentDidMount");
  }, []);

  // 作为 componentDidUpdate 使用，可指定依赖.
  // 如果依赖中有1个或多个state，在组件挂载时会执行1次这个effect. 因为初始化state时也会调用这个effect
  // 当age改变的时候就会执行
  useEffect(() => {
    console.log("age更新了" + age);
  }, [age]);

  // 作为 componentWillUnmount 使用，通过 return
  useEffect(() => {
    console.log("Index页面--来了---"); // componentDidMount
    return () => {
      console.log("Index页面--走了---"); // componentWillUnmount
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>更新count</button>
      <button onClick={() => setAge(age + 1)}>更新age</button>
    </div>
  );
}
