import Vue from 'vue'
import App from './App.vue'
import router from '../src/router/index'
import store from './store'
import Element from 'element-ui'
import Axios from 'axios'
import './mock/index'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'echarts-gl';
import "echarts/lib/component/legend"
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
Vue.prototype.echarts = echarts
Vue.prototype.axios = Axios
import G6 from '@antv/g6'
console.log(G6);

Vue.prototype.G6 = G6
router.beforeEach((to, from, next) => {
  if (to.name === '/' && !sessionStorage.getItem('user')) {
    console.log('jing');
    next('/login')
    return
  }
  next()
})

Vue.use(Element, {
  size: 'small'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')