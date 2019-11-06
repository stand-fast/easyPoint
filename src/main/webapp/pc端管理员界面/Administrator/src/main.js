import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js';

Vue.use(ElementUI);

//Vue.prototype.$http = axios
//Vue.prototype.$http.defaults.baseURL = 'http://easypoint.club/administrator/'
Vue.prototype.$http = axios.create({
  baseURL: "http://easypoint.club/administrator/",
  timeout: 5000,
  withCredentials: false, // 允许携带cookie
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')