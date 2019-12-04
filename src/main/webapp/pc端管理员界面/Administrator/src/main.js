import Vue from 'vue';
import router from './router.js';
import {
  judgeToken
} from "../src/assets/judge/judgeToken.js";
import axios from '../src/assets/util/http';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js';

import App from './App.vue';
Vue.use(ElementUI);
Vue.prototype.$judgeToken = judgeToken; //处理token异常函数
Vue.prototype.$token = ''; //存储token
Vue.prototype.$username = ''; //存储用户名
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')