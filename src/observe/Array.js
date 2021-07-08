const oldArrayProto = Array.prototype;
export const arrayMethods = Object.create(oldArrayProto);
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    console.log("数组发生变化了");
    const ob = this.__ob__;
    const result = oldArrayProto[method].call(this, ...args);
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    console.log(inserted, "inserted");
    if (inserted) ob.observeArray(inserted);
    return result;
  };
});
