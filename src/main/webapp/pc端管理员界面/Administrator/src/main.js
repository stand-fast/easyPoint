import Vue from 'vue';
import router from './router.js'; //引入路由器
import {
  judgeToken
} from "../src/assets/judge/judgeToken.js"; //处理token异常函数
import store from "./store/index.js" //引入vuex共享数据库
store.dispatch("loginUser/autoLogin"); //刷新页面同步数据
import axios from '../src/assets/util/http.js'; //封装AXIOS
import ElementUI from 'element-ui'; //引入Element组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入Element组件库css
import './plugins/element.js'; //引入Element组件库js

import App from './App.vue';
Vue.use(ElementUI);
Vue.prototype.$judgeToken = judgeToken; //处理token异常函数
Vue.prototype.$token = ''; //存储token
Vue.prototype.$http = axios; //全局引入axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')