import AddAssociation from "./pages/AddAssociation.js" //校友会包车-添加同乡会
import AddLocation from "./pages/AddLocation.js" //校友会包车-添加上写车地点
import AddVehicleType from "./pages/AddVehicleType.js" //旅游出行-添加发布车辆类型
import CarRentalOrder from "./pages/CarRentalOrder.js" //旅游出行-租车订单
import CarRentalRefund from "./pages/CarRentalRefund.js" //旅游出行-租车退款订单
import vehicleEntry from "./pages/vehicle-information-entry.js" //旅游出行-租车订单车辆信息
import CurrentAnnouncement from "./pages/CurrentAnnouncement.js" //公告栏-当前公告

const router = new VueRouter({
    routes: [{
            path: "/AddAssociation",
            component: AddAssociation
        },
        {
            path: "/AddLocation/:id",
            component: AddLocation,
            meta: {
                needLogin: true
            }
        },
        {
            path: "/AddVehicleType",
            component: AddVehicleType
        },
        {
            path: "/CarRentalOrder",
            component: CarRentalOrder
        },
        {
            path: "/CarRentalRefund",
            component: CarRentalRefund
        },
        {
            path: "/vehicleEntry/:id",
            component: vehicleEntry,
            meta: {
                needLogin: true
            }
        },
        {
            path: "/CurrentAnnouncement",
            component: CurrentAnnouncement
        },
    ],
})

export default router