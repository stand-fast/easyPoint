import Vue from 'vue';
import App from './App.vue';
import router from './router.js';
import axios from 'axios';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = ''

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')