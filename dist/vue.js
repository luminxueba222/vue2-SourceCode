(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

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
      console.log("数组发生变化了"); // const ob = this.__ob__;
      // const result = oldArrayProto[method].call(this, ...args);
      // let inserted;
      // switch (method) {
      //   case "push":
      //   case "unshift":
      //     inserted = args;
      //     break;
      //   case "splice":
      //     inserted = args.slice(2);
      //     break;
      // }
      // if (inserted) ob.observeArray(inserted);
      // return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      //对对象所有的属性进行劫持
      console.log(this, "this", data);
      data.__ob = this; // 数组劫持

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
        data.forEach(function (item) {
          observe(item);
        });
      }
    }]);

    return Observer;
  }();

  function defineReactive(obj, key, value) {
    // 递归观测对象
    observe(value);
    Object.defineProperty(obj, key, {
      get: function get() {
        console.log("value", "get", value);
        return value;
      },
      set: function set(newVal) {
        // 如果赋值是{}继续观测
        observe(value);
        value = newVal;
      }
    });
  }

  function observe(data) {
    if (_typeof(data) !== "object" && data !== null) return;
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
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
