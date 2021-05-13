//增加链式调用

/* 
  1、为了达成链式，我们默认在第一个then里返回一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2：promise2 = new Promise((resolve, reject)=>{})

    将这个promise2返回的值传递到下一个then中

    如果返回一个普通的值，则将普通的值传递给下一个then中

  2、当我们在第一个then中return了一个参数（参数未知，需判断）。这个return出来的新的promise就是onFulfilled()或onRejected()的值，

  秘籍则规定onFulfilled()或onRejected()的值，即第一个then返回的值，叫做x，判断x的函数叫做resolvePromise
    
    首先，要看x是不是promise。

    如果是promise，则取它的结果，作为新的promise2成功的结果

    如果是普通值，直接作为promise2成功的结果

    所以要比较x和promise2

    resolvePromise的参数有promise2（默认返回的promise）、x（我们自己return的对象）、resolve、reject

    resolve和reject是promise2的

*/

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
    // 声明返回的promise2
    let promise2 = null;
    promise2 = new Promise_c((resolve, reject) => {
      //当state为fulfilled的时候，执行onFulfilled，并传入成功的值
      if (this.state === "fulfilled") {
        let x = onFulfilled(this.value);
        // resolvePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject);
      }

      //当state为rejected的时候，执行onRejected，并传入失败的原因
      if (this.state === "rejected") {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }

      // 当状态state为pending时
      if (this.state === "pending") {
        // onFulfilled传入到成功数组
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });

        // onRejected传入到失败数组
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });

    // 返回promise，完成链式
    return promise2;
  }
}

//完成resolvePromise函数

/* 
  秘籍规定了一段代码，让不同的promise代码互相套用，叫做resolvePromise

  如果 x === promise2，则是会造成循环引用，自己等待自己完成，则报“循环引用”错误
*/

// let p = new Promise((resolve) => resolve(0));
// let p1 = p.then(() => {
//   console.log(p);
//   console.log(p1);
//   return p1; // Chaining cycle detected for promise #<Promise>
// });

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === "function") {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(
          x,
          (y) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err); // 失败了就失败了
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(x);
  }
}

let p = new Promise_c((resolve, reject) => {
  resolve(0);
});

p.then((res) => {
  // console.log(res);
  return res;
}).then((res) => console.log(res));
