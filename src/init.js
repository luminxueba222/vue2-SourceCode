import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./lifecycle.js";
import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;
    initState(vm);
    if (options.el) {
      vm.$mount(options.el);//实现数据的挂载
    }
  };
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;
    // vue 1 直接替换用正则直接替换 template
    // 把模板转换成渲染函数=>虚拟dom=>diff算法 => 更新虚拟dom=>产生真实节点更新
    if (!options.render) {//优先 render函数
      let template = options.template; //其次 template
      if (!template && el) {
        template = el.outerHTML;
      }
      if(template){
        let render = compileToFunctions(template);
        options.render = render;
      }
      console.log('templatetemplate',template);
    }
    //  options.render  渲染函数   渲染成真实dom 替换页面的内容
    mountComponent(vm, el); //组件的挂载流程
  };
}
