import { createElement, createTxetElement } from "./vdom/index";

export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    let { render } = vm.$options;
    let vnode = render.call(vm);
    return vnode;
  };
  Vue.prototype._c = function () {
    //createElement
    return createElement(this, ...arguments);
  };
  Vue.prototype._v = function (text) {
    //createTxetElement
    return createTxetElement(this, ...arguments);
  };
  Vue.prototype._s = function (val) {
    if (typeof val == "object") return JSON.stringify(val);
    return val;
  };
}
