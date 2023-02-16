export function createElement(vm, tag, data = {}, ...children) {
  return vnode(vm, tag, data, data.key, children, undefined);
}
export function createTxetElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}
// ast 一样   ast做的是语法层面的转换，它描述的是语法本身（是对html的描述）
// vnode (虚拟dom)是描述的dom元素 ，可以增加一些自定义属性
export function vnode(vm, tag, data, key, children, text) {
  //虚拟节点：就是一个对象用来描述dom 结构  可以新增自定义的属性
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
  };
}
