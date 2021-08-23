export function patch(oldVnode, vnode) {
  console.log("oldVnode", oldVnode);
  if (oldVnode.nodeType == 1) {
    //用vnode  来生成真实dom 替换原来的dom元素
  }
}
