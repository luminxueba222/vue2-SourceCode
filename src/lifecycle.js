import { patch } from "./vdom/patch";

export function mountComponent(vm, el) {
  // 更新函数  数据变化后 会再次调用此函数
  let updateComponent = () => {
    // 调用render 生成虚拟dom
    vm._update(vm._render());
  };
  updateComponent();
}
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 有初始化 和更新
    patch(vm.$el, vnode);
  };
}
