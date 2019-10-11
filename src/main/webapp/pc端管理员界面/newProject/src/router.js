import Vue from 'vue'
import Router from 'vue-router'
import AddAssociation from "./pages/AddAssociation.vue" //校友会包车-添加同乡会
import AddLocation from "./pages/AddLocation.vue" //校友会包车-添加上写车地点
import AddVehicleType from "./pages/AddVehicleType.vue" //旅游出行-添加发布车辆类型
import CarRentalOrder from "./pages/CarRentalOrder.vue" //旅游出行-租车订单
import CarRentalRefund from "./pages/CarRentalRefund.vue" //旅游出行-租车退款订单
import vehicleEntry from "./pages/VehicleInformationEntry.vue" //旅游出行-租车订单车辆信息
import CurrentAnnouncement from "./pages/CurrentAnnouncement.vue" //公告栏-当前公告
Vue.use(Router)

export default new Router({
  routes: [{
      path: "/AddAssociation",
      name: 'AddAssociation',
      component: AddAssociation
    },
    {
      path: "/AddLocation/:id",
      name: 'AddLocation',
      component: AddLocation,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/AddVehicleType",
      name: 'AddVehicleType',
      component: AddVehicleType
    },
    {
      path: "/CarRentalOrder",
      name: 'CarRentalOrder',
      component: CarRentalOrder
    },
    {
      path: "/CarRentalRefund",
      name: 'CarRentalRefund',
      component: CarRentalRefund
    },
    {
      path: "/vehicleEntry/:id",
      name: 'vehicleEntry',
      component: vehicleEntry,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/CurrentAnnouncement",
      name: 'CurrentAnnouncement',
      component: CurrentAnnouncement
    },
  ],
})