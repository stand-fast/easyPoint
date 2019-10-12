import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'http://easypoint.club/'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')