import React, { Component } from "react";

//类组件

export default class Priority extends Component {
  state = {
    counter: 0,
  };

  //这个构造函数对我们写业务逻辑是多余的
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); //如果这里不绑定this的话 this.handleClick是找不到的 因为当前这个类下面没有handleClick这个函数
  }

  handleClick() { //如果不绑定那么这里的this指向的是window
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    return (
      <div>
        <p>counter: {this.state.counter}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

//函数组件

// export default function Priority() {
//   const [counter, setCounter] = useState(0);

//   const handleClick = () => setCounter(counter + 1);

//   return (
//     <div>
//       <p>counter: {counter}</p>
//       <button onClick={handleClick}>Increment</button>
//     </div>
//   );
// }

/* 
  函数组件的优点：
  1.代码更加简洁
  2.没有生命周期方法、构造函数或样板代码，减少我们写业务的代码量
  3.没有this指向的问题

  写函数组件能让我们更专注于写业务逻辑
*/
