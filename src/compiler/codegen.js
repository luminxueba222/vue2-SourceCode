


// _c() 创建元素  
// _v() 文本
// _s()  原理JSON.stringify()
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{name}}
export function generate(el) {
  let children = genChildren(el);
  // 遍历树  拼接成字符窜
  let code = `_c("${el.tag}",${
    el.attrs.length ? genProps(el.attrs) : "undefined"
  }${children ? `,${children}` : ""})`;
  //_c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_v("word"+_s(arr)+"hello"))
  return code;
}

function genChildren(el) {
  let children = el.children; //获取儿子
  if (children) {
    return children.map((c) => gen(c)).join(",");
  }
  return false;
}

function gen(el) {
  if (el.type === 1) {
    return generate(el);
  } else {
    let text = el.text;
    if (!defaultTagRE.test(text)) {
      return `_v('${text}')`; //_v()文本
    } else {
      let tokens = [];
      let match;
      let lastIndex = (defaultTagRE.lastIndex = 0);
      while ((match = defaultTagRE.exec(text))) {
        let index = match.index; //开始索引
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        // tokens.push(JSON.stringify(match[1].trim()));  _s()  原理JSON.stringify()
        tokens.push(`_s(${match[1].trim()})`);
        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      return `_v(${tokens.join("+")})`;
    }
  }
}

function genProps(attrs) {
  //  [{name: "id", value: "app"},{name: "a", value: "1"}]
  let str = "";
  for (let index = 0; index < attrs.length; index++) {
    let attr = attrs[index];
    if (attr.name === "style") {
      let styleObj = {};
      attr.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
        styleObj[arguments[1]] = arguments[2];
      });
      attr.value = styleObj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
