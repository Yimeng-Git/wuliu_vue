import Vue from 'vue'
import App from './App.vue'
import './utils/http';
//引入store
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入router路由器
import router from './router'
Vue.config.productionTip = true
Vue.use(ElementUI);

// Vue.prototype.verify=function () {
//   return this.$http.get('/user')
// }

//创建vm
new Vue({
  el:'#app',
  store,
  router:router,
  render: h => h(App),
  // //开启全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this
  }
})
