import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

Vue.use(ElementUI);

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://easypoint.club/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')