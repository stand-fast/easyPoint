import Vue from 'vue'
import Router from 'vue-router'
import AddAssociation from "./pages/CommitteeVihicle/AddAssociation.vue" //校友会包车-添加同乡会
import AddLocation from "./pages/CommitteeVihicle/AddLocation.vue" //校友会包车-添加上写车地点
import BusSearcher from "./pages/CommitteeVihicle/BusSearcher.vue" //校友会包车-添加车辆
import TicketManagement from "./pages/CommitteeVihicle/TicketManagement.vue" //校友会包车-添加上写车地点
import PurchaseDetails from "./pages/CommitteeVihicle/PurchaseDetails.vue" //校友会包车-购票详情
import Vehicle from "./pages/CommitteeVihicle/Vehicle.vue" //校友会包车-车辆信息
import HistoryTicket from "./pages/CommitteeVihicle/HistoryTicket.vue" //校友会包车-历史发布
import AddVehicleType from "./pages/Travel/AddVehicleType.vue" //旅游出行-添加发布车辆类型
import CarRentalOrder from "./pages/Travel/CarRentalOrder.vue" //旅游出行-租车订单
import CarRentalRefund from "./pages/Travel/CarRentalRefund.vue" //旅游出行-租车退款订单
import vehicleEntry from "./pages/Travel/VehicleInformationEntry.vue" //旅游出行-租车订单车辆信息
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
      path: "/BusSearcher",
      name: 'BusSearcher',
      component: BusSearcher
    },
    {
      path: "/TicketManagement",
      name: 'TicketManagement',
      component: TicketManagement
    },
    {
      path: "/PurchaseDetails/:id",
      name: 'PurchaseDetails',
      component: PurchaseDetails,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/Vehicle/:id",
      name: 'Vehicle',
      component: Vehicle,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/HistoryTicket",
      name: 'HistoryTicket',
      component: HistoryTicket
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