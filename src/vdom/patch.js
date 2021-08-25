import { vnode } from ".";

export function patch(oldVnode, vnode) {
  if (oldVnode.nodeType == 1) {
    //元素
    //用vnode  来生成真实dom 替换原来的dom元素  insertBefore
    const parentEle = oldVnode.parentNode;
    let elm = createElm(vnode); //根据虚拟节点创建元素

    parentEle.insertBefore(elm, oldVnode.nextSibling);
    parentEle.removeChild(oldVnode);
    return elm;
  }
}
function createElm(vnode) {
  let { tag, data, children, text, vm } = vnode;
  if (typeof tag === "string") {
    //元素
    vnode.el = document.createElement(tag); //虚拟节点会有一个el属性  对应真实的节点
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    //文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
