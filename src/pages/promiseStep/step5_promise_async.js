//解决异步的问题

//现在基本可以实现简单的同步代码，但是当resolve在setTomeout内执行，then时state还是pending等待状态 我们就需要在then调用的时候，将成功和失败存到各自的数组，一旦reject或者resolve，就调用它们
//因为可能存在很多个then，所以要存在同一个数组里面

class Promise_c {
  constructor(executor) {
    //初始化状态为等待态
    this.state = "pending";
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      //在reslove里面，state状态只能由pending变为fulfilled
      //若state不为pending那么resolve将会调用失败
      if (this.state == "pending") {
        //resolve调用之后将state改为fulfilled
        this.state = "fulfilled";
        //将成功的值存储起来
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
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
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
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

    // 当状态state为pending时
    if (this.state === "pending") {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });

      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}


let p_test = new Promise_c((resolve, reject) => {
  setTimeout(() => {
    resolve(5);
  }, 1000);
});
p_test.then(
  (res) => console.log("p_test：" + res),
  (err) => console.log("p_test：" + err)
);