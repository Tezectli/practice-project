/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './services/install'
import { Toast, Dialog } from 'vant'
// import 'url-search-params-polyfill';
Vue.config.productionTip = false
Vue.config.devtools = true
// 全局注册接口
Vue.use(api)
// 注册vant
Vue.use(Toast).use(Dialog)
// 如果是非正式环境
if (process.env.NODE_ENV !== 'production') {
  // 加载用于真机调试的控制台
  // var VConsole = require('vconsole/dist/vconsole.min.js');
  // var vConsole = new VConsole();
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
