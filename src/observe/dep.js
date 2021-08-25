let id = 0;
class Dep {
  //每个属性都分配一个dep dep可以存放watcher   watcher中还要存放dep
  constructor() {
    this.id = id++;
    this.subs = []; //用来存放watcher
  }
  depend() {
    //Dep.target dep里要存放这个watcher watcher要存放dep  多对多的关系
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
Dep.target = null;
export function pushTarget(watcher) {
  Dep.target = watcher;
}
export function popTarget() {
  Dep.target = null;
}
export default Dep;
