import { observe } from "./observe";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}
function initData(vm) {
  let data = vm.$options.data;
  // 函数 取返回值
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  // 代理  能直接使用vm.数据
  const keys = Object.keys(data);
  let i = keys.length;
  while (i--) {
    let key = keys[i];
    proxy(vm, `_data`, key);
  }
  observe(data);
}
// 当取vm.数据   就去取vm._data数据
export function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key];
    },
    set(val) {
      vm[sourceKey][key] = val;
    },
  });
}
