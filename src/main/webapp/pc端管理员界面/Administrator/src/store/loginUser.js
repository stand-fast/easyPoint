import Vue from 'vue';
import loginService from "../services/loginService.js";

export default {
    namespaced: true, //开启命名空间
    state: {
        data: null, //当前登录的用户为空
        isLogining: false //当前正在登录
    },
    mutations: {
        setIsLogining(state, newStatus) { //用于改变是否正在登录的状态
            //参数state：表示当前的状态
            //newStatus（负载）：可选的，该参数表示额外的信息
            state.isLogining = newStatus;
        },
        setUser(state, userData) { //用于改变登录的用户
            state.data = userData;
        }
    },
    actions: {
        async login(context, {
            loginId,
            loginPwd
        }) { //需要传入账号和密码
            context.commit("setIsLogining", true);
            const result = await loginService.login(loginId, loginPwd)
            if (result) {
                //登录成功
                context.commit("setUser", result);
                //额外的操作，保存用户信息到localStorage
                localStorage.setItem("loginUser", JSON.stringify(result));
                return true;
            }
            context.commit("setIsLogining", false);
            return false;
        },
        loginOut(context) {
            //退出登录
            context.commit("setUser", null);
            localStorage.removeItem("loginUser");
        },
        autoLogin(context) {
            //初始化时，同步本地存储
            let item = localStorage.getItem("loginUser");
            let user = null;
            if (item) {
                user = JSON.parse(item);
                //console.log(user);
                context.commit("setUser", user);
            }
        }
    }
}