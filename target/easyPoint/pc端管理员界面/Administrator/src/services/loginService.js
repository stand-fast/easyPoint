import Vue from 'vue';
import axios from "../assets/util/http"; //引入axios
export default {
    async login(loginId, loginPwd) {
        var params = new URLSearchParams();
        params.append('phone', loginId);
        params.append('password', loginPwd);
        let message = await axios.post("adminLogin", params)
            .then(function (res) {
                console.log(res.data);
                if (res.data.code == 1) {
                    let admin = res.data.data.admin;
                    Vue.prototype.$token = res.data.data.token;
                    Vue.prototype.$username = res.data.data.admin.username;
                    return new Promise(resolve => {
                        let identity = "";
                        if (admin.identity == 0) {
                            identity = "超级管理员";
                        } else if (admin.identity == 1) {
                            identity = "管理员";
                        }
                        resolve({
                            loginId: admin.phone,
                            identity: identity,
                            token: res.data.data.token,
                            username: res.data.data.admin.username
                        })
                    })
                }
            })
            .catch(function (e) {
                console.log(e);
            });
        return message
    }
}