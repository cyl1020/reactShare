//由于promise是一个类，所以先回忆一下class的基础
class Step_class {
  constructor(name, content) {
    //Step_class类的属性
    (this.name = name), (this.content = content);
  }

  //Step_class类的方法
  say() {
    console.log(this.name + "说" + this.content);
  }
}

let test = new Step_class("张三", "你好");
test.say();
console.log(test.name);
console.log(test.content);
