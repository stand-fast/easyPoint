import Vue from 'vue';
import Vuex from 'vuex';
import loginUser from "./loginUser.js"; //登陆模块
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        loginUser //登陆模块
    }
})