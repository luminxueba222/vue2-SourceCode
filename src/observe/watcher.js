import { popTarget, pushTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm, exprOrFn, cd, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cd = cd;
    this.options = options;
    //默认应该执行exprOrFn    exprOrFn  调用render 生成虚拟dom
    this.getter = exprOrFn;
    this.deps = [];
    this.depsId = new Set();
    this.id = id++;
    this.get();
  }
  get() {
    //稍后用户更新时可以重新调用getter方法
    //defineProperty.get  执行
    pushTarget(this);
    this.getter();
    popTarget();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  update() {
    this.get();
  }
}

export default Watcher;
