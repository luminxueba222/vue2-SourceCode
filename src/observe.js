class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i]);
    }
  }
}
function defineReactive(obj, key) {
  console.log("defineReactive");
  Object.defineProperty(obj, key, {
    get() {
      console.log("getnewVal");
    },
    set(newVal) {
      console.log(newVal, "newVal");
    },
  });
}
export function observe(data) {
  console.log(data, "observe");
  if (typeof data !== "object") return;
  return new Observer(data);
}
