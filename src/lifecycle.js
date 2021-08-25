import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";
// 后续没过组件渲染的时候都要有一个watcher
export function mountComponent(vm, el) {
  // 更新函数  数据变化后 会再次调用此函数
  let updateComponent = () => {
    // 调用render 生成虚拟dom
    vm._update(vm._render());
  };
  //观察者模式   属性是 被观察者   刷新页面  是观察者
  // updateComponent();
  new Watcher(
    vm,
    updateComponent,
    () => {
      console.log("更新视图了");
    },
    true
  ); //它是一个渲染watcher  后续还有其它的watcher
}
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 有初始化 和更新
    vm.$el = patch(vm.$el, vnode);
  };
}
