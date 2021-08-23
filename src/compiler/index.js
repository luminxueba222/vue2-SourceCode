import { generate } from "./codegen";
import { parseHTML } from "./html-parser";

export function compileToFunctions(template) {
  //  将html词法解析(开始标签  属性  文本)  => ast语法树 用来描述HTML语法的 (利用 stack=[])=>codegen  (_c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}})=>让字符串执行(字符串转换为代码)
  // =>render 函数 (with+new Function)=>虚拟Dom(增加额外的属性)=>生成真实的Dom
  // 字符串转换为代码  eval  消耗性能  会有作用域的问题

  let root = parseHTML(template);
  // {type: 1, tag: "div", attrs: Array(4), parent: undefined, children: Array(1)}  AST语法树
  let code = generate(root);
  // _c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_c('ul'),undefined,_c('li'),undefined,_v('li111')),_c('li'),undefined,_v('li2222'))),_v("word"+_s(arr)+"hello"))
  let render = new Function(`with(this){return ${code}}`);
  // function anonymous(
  //   ) {
  //   with(this){return _c("div",{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_v("word"+_s(arr)+"hello"))}
  //   }
  return render;
}

// with
// let vm = {arr:[1]}
// with (vm){console.log(arr)}
