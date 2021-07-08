(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  //<div id="app">{{name}}</div>
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; //标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //获取标签名 div  template.match(new RegExp(qnameCapture)

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 匹配开始标签

  var startTagClose = /^\s*(\/?)>/;

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性 id="app"
  // html字符串  解析成dom树
  // vue 是用的正则匹配 (应该逐词解析)

  function compileToFunctions(template) {
    parseHTML(template);
  }

  function parseHTML(html) {
    var index = 0;

    while (html) {
      var textEnd = html.indexOf("<");

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();
        console.log(startTagMatch, "startTagMatch");
        return;
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
        }

        if (_end) {
          advance(_end[0].length);
        }

        console.log(match, "match"); // console.log(html, "html");     >{{name}}</div> html

        return match;
      }
    }

    function advance(n) {
      console.log(n, "n");
      index += n;
      html = html.substring(n);
    }
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
          compileToFunctions(template);
        }
      }
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
