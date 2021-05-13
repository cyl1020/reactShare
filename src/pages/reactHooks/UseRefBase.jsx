import React, { useState, useEffect, useRef } from "react";

/* 

  useRef 引用

        useRef: 它对标的是ref，也就是用来在render中收集dom元素,它的使用方法与useState没太大的差别，
    唯一要注意的是它不会直接把值return给你，而是以{current:value}这样的形式

    高阶用法： 

        在一个组件中有什么东西可以跨渲染周期，也就是在组件被多次渲染之后依旧不变的属性？第一个想到的应该是state。
    没错，一个组件的state可以在多次渲染之后依旧不变。但是，state的问题在于一旦修改了它就会造成组件的重新渲染。 
    那么这个时候就可以使用useRef来跨越渲染周期存储数据，而且对它修改也不会引起组件渲染。
*/

export default function UseRefBase() {
  //基本用法
  const titleRef = useRef();
  const onClick = () => {
    console.log(titleRef);
  };

  //高阶用法
  const [count, setCount] = useState(0);
  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count > 10) {
      clearInterval(timerID.current);
    }
  });

  return (
    <div>
      <div ref={titleRef}>123</div>
      <button onClick={onClick}>点击</button>
      <button
        ref={timerID}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        更新
      </button>
    </div>
  );
}
