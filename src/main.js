import Vue from 'vue'
import App from './App.vue'
import router from '../src/router/index'
import store from './store'
import Element from 'element-ui'
import Axios from 'axios'
import './mock/index'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.axios = Axios
Vue.use(Element, {
  size: 'small'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')