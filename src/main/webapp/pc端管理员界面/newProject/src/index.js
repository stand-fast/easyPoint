import App from "./app.js"
import router from "./router.js"
//仅负责启动vue和启动时的配置，所有界面交给组件app来渲染

const template = `<App/>`
new Vue({
    template,
    components: {
        App,
    },
    el: "#app",
    router
})