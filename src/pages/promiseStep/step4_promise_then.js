//promise then方法

// function test() {
//   return new Promise((resolve, reject) => {
//     let num = Math.ceil(Math.random() * 10); //生成1-10的随机数
//     if (num <= 5) {
//       resolve(num);
//     } else {
//       reject("数字太大了");
//     }
//   });
// }

// test().then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

//秘籍规定:Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
/* 
  当状态state为fulfilled，则执行onFulfilled，传入this.value。当状态state为rejected，则执行onRejected，传入this.reason

  onFulfilled,onRejected如果他们是函数，则必须分别在fulfilled，rejected后被调用，value或reason依次作为他们的第一个参数

  promise A+ 里面说到：
  如果onFulfilled不是函数，则必须将其忽略。如果onRejected不是函数，则必须将其忽略。
*/

//具体实现请看链式调用的时候
// let promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("fail");
//   }, 1000);
// });
// promise2 = promise1.then(
//   (res) => res,
//   "这里的onRejected本来是一个函数，但现在不是"
// );
// promise2.then(
//   (res) => {
//     console.log(res);
//   },
//   (err) => {
//     console.log(err); // 1秒后打印出：fail
//   }
// );

//知道了上面的一些规则之后 我们可以得到下面的代码

class Promise_c {
  constructor(executor) {
    //初始化状态为等待态
    this.state = "pending";
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    let resolve = (value) => {
      //在reslove里面，state状态只能由pending变为fulfilled
      //若state不为pending那么resolve将会调用失败
      if (this.state == "pending") {
        //resolve调用之后将state改为fulfilled
        this.state = "fulfilled";
        //将成功的值存储起来
        this.value = value;
      }
    };

    let reject = (reason) => {
      //在reject里面，state状态只能由pending变为rejected
      //若state不为pending那么reject将会调用失败
      if (this.state == "pending") {
        //reject调用之后将state改为rejected
        this.state = "rejected";
        //将失败的原因存储起来
        this.reason = reason;
      }
    };

    //如果executor执行失败就直接执行reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  //then方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    //当state为fulfilled的时候，执行onFulfilled，并传入成功的值
    if (this.state == "fulfilled") {
      onFulfilled(this.value);
    }

    //当state为rejected的时候，执行onRejected，并传入失败的原因
    if (this.state == "rejected") {
      onRejected(this.reason);
    }
  }
}

let p_test = new Promise_c();
console.log("p_test：", p_test);

let p_test1 = new Promise_c((resolve, reject) => {
  resolve("我是resolve");
});
p_test1.then((res) => {
  console.log("p_test1：" + res);
});
console.log("p_test1：", p_test1);

let p_test2 = new Promise_c((resolve, reject) => {
  reject("我是reject");
});
p_test2.then(
  (res) => console.log("p_test2：" + res),
  (err) => console.log("p_test2：" + err)
);
console.log("p_test2：", p_test2);

let p_test3 = new Promise_c((resolve, reject) => {
  let num = Math.ceil(Math.random() * 10); //生成1-10的随机数
  if (num <= 5) {
    resolve(num);
  } else {
    reject("数字太大了");
  }
});
p_test3.then(
  (res) => console.log("p_test3：" + res),
  (err) => console.log("p_test3：" + err)
);
console.log("p_test3：", p_test3);

let p_test4 = new Promise_c((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
  }, 1000);
});
p_test4.then(
  (res) => console.log("p_test4：" + res),
  (err) => console.log("p_test4：" + err)
);
console.log("p_test4：", p_test4);
