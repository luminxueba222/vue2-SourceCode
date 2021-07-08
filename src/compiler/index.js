//<div id="app">{{name}}</div>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //获取标签名 div  template.match(new RegExp(qnameCapture)
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配开始标签
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //  </
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性 id="app"
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{name}}
// html字符串  解析成dom树
// vue 是用的正则匹配 (应该逐词解析)
export function compileToFunctions(template) {
  parseHTML(template);
}
function parseHTML(html) {
  let index = 0;
  function start(tagName, attributes) {}
  function end(tagName) {
    console.log("-->", text);
  }
  function chars(tagname) {}

  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      console.log(startTagMatch, "startTagMatch");
      return;
    }
  }
  function parseStartTag() {
    const start = html.match(startTagOpen);
    // console.log(start, "html");    (2) ["<div", "div", index: 0, input: "<div id=\"app\">{{name}}</div>", groups: undefined]0: "<div"1: "div"groups: undefinedindex: 0input: "<div id=\"app\">{{name}}</div>"length: 2__proto__: Array(0) "html"
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index,
      };
      advance(start[0].length);
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        attr.start = index;
        // console.log(attr, "attr");  [" id=\"app\"", "id", "=", "app", undefined, undefined, index: 0, input: " id=\"app\">{{name}}</div>", groups: undefined, start: 4]0: " id=\"app\""1: "id"2: "="3: "app"4: undefined5: undefinedend: 13groups: undefinedindex: 0input: " id=\"app\">{{name}}</div>"start: 4length: 6__proto__: Array(0) "attr"
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5] || "",
        });
      }
      if (end) {
        advance(end[0].length);
      }
      console.log(match, "match");
      // console.log(html, "html");     >{{name}}</div> html
      return match;
    }
  }
  function advance(n) {
    console.log(n, "n");
    index += n;
    html = html.substring(n);
  }
}
