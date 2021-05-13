//首先，promise肯定是一个类，这里我们就用class来声明
//由于new Promise((resolve, reject)=>{})，所以传入一个参数（函数），秘籍（promise A+）里叫他executor，传入就执行
//executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）
//由于resolve和reject可执行，所以都是函数

//根据上面的信息我们可以得到一个简单的promise类

/* 
  new Promise((resolve, reject) => {
    //成功的操作之后
    resolve();
    //失败的操作之后
    reject();
  });
*/

class Promise_c {
  //构造器
  constructor(executor) {
    //成功的时候执行的函数
    let resolve = () => {};

    //失败的时候执行的函数
    let reject = () => {};

    //这里传入之后就立即执行
    executor(resolve, reject);
  }
}
