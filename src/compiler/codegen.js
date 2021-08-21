export function generate(el) {
  // 遍历树  拼接成字符窜
  console.log("el", el);
  let code = `_c("${el.tag}"),${
    el.attrs.length ? genProps(el.attrs) : "undefined"
  }`;
  console.log("code", code);
}
function genProps(attrs) {
  console.log("attrs", attrs);
  let str = "";
  for (let index = 0; index < attrs.length; index++) {
    let attr = attrs[index];
    if (attr.name === "style") {
      let styleObj = {};
      attr.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
        styleObj[arguments[1]] = arguments[2];
      });
      console.log("attr", attr);
      attr.value = styleObj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
