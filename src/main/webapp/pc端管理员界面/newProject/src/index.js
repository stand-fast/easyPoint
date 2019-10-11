import App from "./app.js"
import CarRentalOrder from "./pages/CarRentalOrder.js"
import AddVehicleType from "./pages/AddVehicleType.js"
import vehicleEntry from "./pages/vehicle-information-entry.js"

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
            path: "/vehicleEntry/:id",
            component: vehicleEntry,
            meta: {
                needLogin: true
            }
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