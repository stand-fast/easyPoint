import Vue from 'vue';
import axios from "../assets/util/http";
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
                        if (admin.identity == 1) {
                            resolve({
                                loginId: admin.phone,
                                name: "管理员"
                            })
                        } else if (admin.identity == 0) {
                            resolve({
                                loginId: admin.phone,
                                name: "超级管理员"
                            })
                        }
                    })
                }
            })
            .catch(function (e) {
                console.log(e);
            });
        return message
    }
}