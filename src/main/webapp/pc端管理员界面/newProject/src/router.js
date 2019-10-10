import vehicleInformationEntry from "./vue-vehicle-information-entry.js"

export default new VueRouter({
    routes: [{
        path: "/vehicle-information-entry/:id",
        component: vehicleInformationEntry,
        meta: {
            needLogin: true
        }
    }, ],
    mode: "hash",

});