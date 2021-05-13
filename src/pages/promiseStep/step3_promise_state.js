//promise基本状态

/* 
  秘籍规定：

  Promise存在三个状态（state）pending、fulfilled、rejected

  pending（等待态）为初始态，并可以转化为fulfilled（成功态）和rejected（失败态）

  成功时，不可转为其他状态，且必须有一个不可改变的值（value）

  失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）

  new Promise((resolve, reject)=>{resolve(value)}) resolve为成功，接收参数value，状态改变为fulfilled，不可再次改变。

  new Promise((resolve, reject)=>{reject(reason)}) reject为失败，接收参数reason，状态改变为rejected，不可再次改变。

  若是executor函数报错 直接执行reject();
*/

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
}

let p_test = new Promise_c();
console.log(p_test);

let p_test1 = new Promise_c(() => {});
console.log(p_test1);

let p_test2 = new Promise_c((resolve, reject) => {
  resolve(123);
});
console.log(p_test2);

let p_test3 = new Promise_c((resolve, reject) => {
  reject(123);
});
console.log(p_test3);