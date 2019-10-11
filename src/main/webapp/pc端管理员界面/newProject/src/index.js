import App from "./app.js"
import Home from "./pages/index.js"
import CarRentalOrder from "./pages/CarRentalOrder.js"
import AddVehicleType from "./pages/AddVehicleType.js"

const router = new VueRouter({
    routes: [{
            path: "/AddVehicleType",
            component: AddVehicleType
        },
        {
            path: "/CarRentalOrder",
            component: CarRentalOrder
        },
        {
            path: "/CarRentalRefund",
            component: Home
        },

    ],
})
const template = `<App/>`
new Vue({
    template,
    components: {
        App,
    },
    el: "#app",
    router
})