import { compileToFunctions } from "./compiler/index.js";
import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    initState(vm);
    if (options.el) {
      vm.$mount(options.el);
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // vue 1 直接替换用正则直接替换 template
    // 把模板转换成渲染函数=>虚拟dom=>diff算法 => 更新虚拟dom=>产生真实节点更新
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
        compileToFunctions(template);
      }
    }
  };
}
