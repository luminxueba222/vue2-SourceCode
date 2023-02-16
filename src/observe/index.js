import { arrayMethods } from "./Array";
import Dep from "./dep";

class Observer {
  constructor(data) {
    //对对象所有的属性进行劫持
    data.__ob__ = this;
    // 数组劫持
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      // 如果数组中的是{}需要监控对象的变化
      this.observeArray(data);
    } else {
      // 对象劫持
      this.walk(data);
    }
  }
  /**
   * Observe a obj 对象
   */
  walk(data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i], data[keys[i]]);
    }
  }
  /**
   * Observe a list Array items 数组
   */
  observeArray(data) {
    data.forEach((item) => {
      observe(item);
    });
  }
}
function defineReactive(obj, key, value) {
  // 递归观测对象
  if (key == "__ob__") return;
  observe(value);
  let dep = new Dep(); //每个属性都有一个dep属性
  Object.defineProperty(obj, key, {
    get() {
      //取值时我希望watcher和dep的对应起来
      if (Dep.target) {
        //此值是在模板中取的
        dep.depend();
      }
      console.log(key, "key", dep);
      return value;
    },
    set(newVal) {
      // 如果赋值是{}继续观测
      if (newVal !== value) {
        dep.notify();
        observe(newVal);
        value = newVal;
      }
    },
  });
}
export function observe(data) {
  // 只对对象劫持
  
  if (typeof data !== "object") return;
  if (data.__ob__) return;
  return new Observer(data);
}
