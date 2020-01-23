import Vue from 'vue'
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'zh_CN',
})
// Vue.use(VeeValidate, {
//     i18n,
//     i18nRootKey: 'validation',
//     dictionary: {
//         zh_CN
//     }
// });

export default i18n;

// 自定义validate
// const dictionary = {
//     zh_CN: {
//         messages: {
//             required: (field) => '请' + field,
//             number: (field) => field + '必须为数值',
//             url: () => '请输入正确格式的服务器地址',
//             ip: () => '请输入正确的IP地址',
//         },
//         attributes: {
//             ip: '输入IP地址',
//             httpPort: '输入HTTP端口',
//             userName: '输入用户昵称',
//             mobile: '输入手机号码',
//             emailAdd: '输入邮件地址',
//             authCode: '输入您收到的验证码',
//             loginPwd: '输入登录密码（6~18位',
//             traderpwd: '输入交易密码（6~18位',
//             recommender: '输入您的推荐人',
//             isSee: '阅读用户协议，并同意',
//             npwdLog: '输入新的登录密码',
//             qrwdLog: '输入确认登录密码'
//         }
//     }
// }
// Validator.updateDictionary(dictionary)

// // 1.IPV4地址
// Validator.extend('ipAddr', {
//     messages: {
//         zh_CN: field => '请输入正确的IPV4地址'
//     },
//     validate: value => {
//         return /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/.test(value)
//     }
// })

// // 2.端口【0~65535】
// Validator.extend('port', {
//     messages: {
//         zh_CN: field => '请输入正确格式的端口号'
//     },
//     validate: value => {
//         return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)
//     }
// })

// // 3.用户昵称
// Validator.extend('name', {
//     messages: {
//         zh_CN: field => '用户昵称不允许特殊符号'
//     },
//     validate: value => {
//         return /^[\u4e00-\u9fa5A-Za-z0-9]*$/.test(value)
//     }
// })

// // 4.用户昵称
// Validator.extend('phone', {
//     messages: {
//         zh_CN: field => '手机号格式不正确'
//     },
//     validate: value => {
//         return /^1[2-9]\d{9}$/.test(value)
//     }
// })

// // 5.邮箱
// Validator.extend('email', {
//     messages: {
//         zh_CN: field => '邮箱格式不正确'
//     },
//     validate: value => {
//         return /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/.test(value)
//     }
// })

// // 6.验证码
// Validator.extend('code', {
//     messages: {
//         zh_CN: field => '验证码格式不正确'
//     },
//     validate: value => {
//         return /^[0-9]*$/.test(value)
//     }
// })

// // 6.登录密码
// Validator.extend('logpwd', {
//     messages: {
//         zh_CN: field => '登录密码格式不正确'
//     },
//     validate: value => {
//         return /^\S{6,18}$/.test(value)
//     }
// })

// // 7.交易密码
// Validator.extend('tradpwd', {
//     messages: {
//         zh_CN: field => '交易密码格式不正确'
//     },
//     validate: value => {
//         return /^\S{6,18}$/.test(value)
//     }
// })

// // 8.推荐人
// Validator.extend('recom', {
//     messages: {
//         zh_CN: field => '推荐人格式不正确'
//     },
//     validate: value => {
//         return /^[^\u4e00-\u9fa5]{0,}$/.test(value)
//     }
// })

// // 9.用户协议
// Validator.extend('see', {
//     messages: {
//         zh_CN: field => '请阅读用户协议，并同意'
//     },
//     validate: value => {
//         return true
//     }
// })

// // 10.忘记密码，新的登录密码
// Validator.extend('npwd', {
//     messages: {
//         zh_CN: field => '登录密码格式不正确[6~18位]'
//     },
//     validate: value => {
//         return /^\S{6,18}$/.test(value)
//     }
// })

// // 11.忘记密码，确认新的登录密码
// Validator.extend('qrwd', {
//     messages: {
//         zh_CN: field => '登录密码格式不正确[6~18位]'
//     },
//     validate: value => {
//         return /^\S{6,18}$/.test(value)
//     }
// })