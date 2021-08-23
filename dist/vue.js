(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{name}}

  function generate(el) {
    var children = genChildren(el); // 遍历树  拼接成字符窜

    var code = "_c(\"".concat(el.tag, "\",").concat(el.attrs.length ? genProps(el.attrs) : "undefined").concat(children ? ",".concat(children) : "", ")"); //_c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_v("word"+_s(arr)+"hello"))

    return code;
  }

  function genChildren(el) {
    var children = el.children; //获取儿子

    if (children) {
      return children.map(function (c) {
        return gen(c);
      }).join(",");
    }

    return false;
  }

  function gen(el) {
    if (el.type === 1) {
      return generate(el);
    } else {
      var text = el.text;

      if (!defaultTagRE.test(text)) {
        return "_v('".concat(text, "')"); //_v()文本
      } else {
        var tokens = [];
        var match;
        var lastIndex = defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          var index = match.index; //开始索引

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          } // tokens.push(JSON.stringify(match[1].trim()));  _s()  原理JSON.stringify()


          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join("+"), ")");
      }
    }
  }

  function genProps(attrs) {
    //  [{name: "id", value: "app"},{name: "a", value: "1"}]
    var str = "";

    for (var index = 0; index < attrs.length; index++) {
      var attr = attrs[index];

      if (attr.name === "style") {
        (function () {
          var styleObj = {};
          attr.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
            styleObj[arguments[1]] = arguments[2];
          });
          attr.value = styleObj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  //<div id="app">{{name}}</div>
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; //标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //获取标签名 div  template.match(new RegExp(qnameCapture)

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签

  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //  </

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性 id="app"
  // html字符串  解析成dom树
  // vue 是用的正则匹配 (应该逐词解析)

  var root = null; //把解析后的结果组装成树结构

  var stack = []; //利用栈结构组装树结构
  // 逐词解析   把字符串解析出来

  function parseHTML(html) {
    var index = 0;

    function start(tagName, attributes) {
      var parent = stack[stack.length - 1];
      var element = createASTElement(tagName, attributes); // console.log("element", element);

      if (!root) {
        root = element;
      }

      element.parent = parent;

      if (parent) {
        parent.children.push(element);
      }

      stack.push(element); // console.log("tagName, attributes", tagName, attributes);
    }

    function end(tagName) {
      // console.log("end  tagName", tagName);
      var last = stack.pop();

      if (last.tag !== tagName) {
        throw new Error("标签有误！");
      }
    }

    function chars(text) {
      text = text.replace(/\s/g, "");
      var parent = stack[stack.length - 1];

      if (text) {
        parent.children.push({
          type: 3,
          text: text
        });
      }
    }

    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
        } // return;

      } // 处理文本


      var text = void 0; //{{name}}</div>

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        chars(text);
        advance(text.length);
      }
    }

    function parseStartTag() {
      var start = html.match(startTagOpen); // console.log(start, "html");    (2) ["<div", "div", index: 0, input: "<div id=\"app\">{{name}}</div>", groups: undefined]0: "<div"1: "div"groups: undefinedindex: 0input: "<div id=\"app\">{{name}}</div>"length: 2__proto__: Array(0) "html"

      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          attr.start = index; // console.log(attr, "attr");  [" id=\"app\"", "id", "=", "app", undefined, undefined, index: 0, input: " id=\"app\">{{name}}</div>", groups: undefined, start: 4]0: " id=\"app\""1: "id"2: "="3: "app"4: undefined5: undefinedend: 13groups: undefinedindex: 0input: " id=\"app\">{{name}}</div>"start: 4length: 6__proto__: Array(0) "attr"

          advance(attr[0].length);
          attr.end = index;
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5] || ""
          });
        } // >{{name}}</div>   出掉结尾标签  {{name}}</div>


        if (_end) {
          advance(_end[0].length);
        } // console.log(match, "match");
        // console.log(html, "html");     >{{name}}</div> html


        return match;
      }
    }

    function advance(n) {
      index += n;
      html = html.substring(n);
    }

    return root;
  }
  function createASTElement(tagName, attrs) {
    return {
      type: 1,
      tag: tagName,
      attrs: attrs,
      parent: null,
      children: []
    };
  }

  function compileToFunctions(template) {
    //  将html词法解析(开始标签  属性  文本)  => ast语法树 用来描述HTML语法的 (利用 stack=[])=>codegen  (_c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}})=>让字符串执行(字符串转换为代码)
    // =>render 函数 (with+new Function)=>虚拟Dom(增加额外的属性)=>生成真实的Dom
    // 字符串转换为代码  eval  消耗性能  会有作用域的问题
    var root = parseHTML(template); // {type: 1, tag: "div", attrs: Array(4), parent: undefined, children: Array(1)}  AST语法树

    var code = generate(root); // _c('div'),{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_c('ul'),undefined,_c('li'),undefined,_v('li111')),_c('li'),undefined,_v('li2222'))),_v("word"+_s(arr)+"hello"))

    var render = new Function("with(this){return ".concat(code, "}")); // function anonymous(
    //   ) {
    //   with(this){return _c("div",{id:"app",a:"1",b:"2",style:{"margin":" 0px"," color":" #000"}},_v("word"+_s(arr)+"hello"))}
    //   }

    return render;
  } // with
  // let vm = {arr:[1]}
  // with (vm){console.log(arr)}

  function mountComponent(vm, el) {
    vm._update(vm._render());
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {};
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var oldArrayProto = Array.prototype;
  var arrayMethods = Object.create(oldArrayProto);
  var methods = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayProto$method;

      console.log("数组发生变化了");
      var ob = this.__ob__;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));

      var inserted;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
          break;
      }

      console.log(inserted, "inserted");
      if (inserted) ob.observeArray(inserted);
      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      //对对象所有的属性进行劫持
      data.__ob__ = this; // 数组劫持

      if (Array.isArray(data)) {
        data.__proto__ = arrayMethods; // 如果数组中的是{}需要监控对象的变化

        this.observeArray(data);
      } else {
        // 对象劫持
        this.walk(data);
      }
    }
    /**
     * Observe a obj 对象
     */


    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);

        for (var i = 0; i < keys.length; i++) {
          defineReactive(data, keys[i], data[keys[i]]);
        }
      }
      /**
       * Observe a list Array items 数组
       */

    }, {
      key: "observeArray",
      value: function observeArray(data) {
        console.log(data, "observeArray");
        data.forEach(function (item) {
          observe(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(obj, key, value) {
    // 递归观测对象
    if (key == "__ob__") return;
    observe(value);
    Object.defineProperty(obj, key, {
      get: function get() {
        console.log("defineReactive", value);
        return value;
      },
      set: function set(newVal) {
        console.log("defineReactive", "set", newVal); // 如果赋值是{}继续观测

        observe(newVal);
        value = newVal;
      }
    });
  }

  function observe(data) {
    if (_typeof(data) !== "object") return;
    if (data.__ob__) return;
    return new Observer(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function initData(vm) {
    var data = vm.$options.data; // 函数 取返回值

    data = vm._data = typeof data === "function" ? data.call(vm) : data; // 代理  能直接使用vm.数据

    var keys = Object.keys(data);
    var i = keys.length;

    while (i--) {
      var key = keys[i];
      proxy(vm, "_data", key);
    }

    observe(data);
  } // 当取vm.数据   就去取vm._data数据


  function proxy(vm, sourceKey, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[sourceKey][key];
      },
      set: function set(val) {
        vm[sourceKey][key] = val;
      }
    });
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);

      if (options.el) {
        vm.$mount(options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // vue 1 直接替换用正则直接替换 template
      // 把模板转换成渲染函数=>虚拟dom=>diff算法 => 更新虚拟dom=>产生真实节点更新

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
          var render = compileToFunctions(template);
          options.render = render;
        }
      }

      console.log("options.render", options.render);
      mountComponent(vm);
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function (vnode) {};
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  lifecycleMixin(Vue); // _update

  renderMixin(Vue); // _render

  return Vue;

})));
//# sourceMappingURL=vue.js.map
