import { arrayMethods } from "./Array";

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
    console.log(data, "observeArray");
    data.forEach((item) => {
      observe(item);
    });
  }
}
function defineReactive(obj, key, value) {
  // 递归观测对象
  if (key == "__ob__") return;
  observe(value);
  Object.defineProperty(obj, key, {
    get() {
      console.log("defineReactive", value);
      return value;
    },
    set(newVal) {
      console.log("defineReactive", "set", newVal);
      // 如果赋值是{}继续观测
      observe(newVal);
      value = newVal;
    },
  });
}
export function observe(data) {
  if (typeof data !== "object") return;
  if (data.__ob__) return;
  return new Observer(data);
}
