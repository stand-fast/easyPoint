import axios from 'axios'
import Vue from 'vue';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://easypoint.club/administrator/'; //这是调用数据接口

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
    config => {
        const token = Vue.prototype.$token; //获取Cookie
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded' //设置跨域头部
        };
        if (token) {
            config.headers = {
                'token': token
            }
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
        // if (response.data.errCode == 2) {
        //     router.push({
        //         path: '/login',
        //         query: {
        //             redirect: router.currentRoute.fullPath
        //         } //从哪个页面跳转
        //     })
        // }
        return response;
    },
    error => {
        alert("服务器繁忙，请稍后重试，请检查网络环境");
        return Promise.reject(error)
    });

export default axios;