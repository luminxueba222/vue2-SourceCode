export function createElement(vm, tag, data = {}, ...children) {
  return vnode(vm, tag, data, data.key, children, undefined);
}
export function createTxetElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

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
