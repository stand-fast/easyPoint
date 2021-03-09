import Vue from 'vue'
import Router from 'vue-router'
import store from "./store/index.js" //vuex共享数据库
import login from "./pages/login.vue" //登陆界面
import home from "./pages/home.vue" //主界面
const AccountManagement = () => import('./pages/Administrator/AccountManagement.vue') //管理员板块-账号管理
const AddAssociation = () => import('./pages/CommitteeVihicle/AddAssociation.vue') //校友会包车-添加同乡会
const AddLocation = () => import('./pages/CommitteeVihicle/AddLocation.vue') //校友会包车-添加上写车地点
const BusSearcher = () => import('./pages/CommitteeVihicle/BusSearcher.vue') //校友会包车-添加车辆
const TicketManagement = () => import('./pages/CommitteeVihicle/TicketManagement.vue') //校友会包车-我的发布
const PurchaseDetails = () => import('./pages/CommitteeVihicle/PurchaseDetails.vue') //校友会包车-购票详情
const Vehicle = () => import('./pages/CommitteeVihicle/Vehicle.vue') //校友会包车-车辆信息
const HistoryTicket = () => import('./pages/CommitteeVihicle/HistoryTicket.vue') //校友会包车-历史发布
const AddVehicleType = () => import('./pages/Travel/AddVehicleType.vue') //旅游出行-添加发布车辆类型
const CarRentalOrder = () => import('./pages/Travel/CarRentalOrder.vue') //旅游出行-租车订单
const CarRentalRefund = () => import('./pages/Travel/CarRentalRefund.vue') //旅游出行-租车退款订单
const DealOrder = () => import('./pages/Travel/DealOrder.vue') //旅游出行-租车退款订单详情
const vehicleEntry = () => import('./pages/Travel/VehicleInformationEntry.vue') //旅游出行-租车订单车辆信息
const addCategory = () => import('./pages/LeaseIdle/addCategory.vue') //租赁闲置-添加商品类目
const PublishGoods = () => import('./pages/LeaseIdle/PublishGoods.vue') //租赁闲置-发布商品
const MyReleasesGoods = () => import('./pages/LeaseIdle/MyReleasesGoods.vue') //租赁闲置-我的发布
const GoodOrders = () => import('./pages/LeaseIdle/GoodOrders.vue') //租赁闲置-商品订单
const CurrentAnnouncement = () => import('./pages/Announcement/CurrentAnnouncement.vue') //公告栏-当前公告

Vue.use(Router)

const router = new Router({
  routes: [{
      path: "/login",
      name: '登陆',
      component: login,
    },
    {
      path: "/",
      name: '主页',
      component: home,
    },
    {
      path: "/AccountManagement",
      name: '管理员板块-账号管理',
      component: AccountManagement,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/AddAssociation",
      name: '校友会包车-添加同乡会',
      component: AddAssociation,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/AddLocation/:id",
      name: '校友会包车-添加上写车地点',
      component: AddLocation,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/BusSearcher",
      name: '校友会包车-添加车辆',
      component: BusSearcher,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/TicketManagement",
      name: '校友会包车-我的发布',
      component: TicketManagement,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/PurchaseDetails/:id",
      name: '校友会包车-购票详情',
      component: PurchaseDetails,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/Vehicle/:id",
      name: '校友会包车-车辆信息',
      component: Vehicle,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/HistoryTicket",
      name: '校友会包车-历史发布',
      component: HistoryTicket,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/AddVehicleType",
      name: '旅游出行-添加发布车辆类型',
      component: AddVehicleType,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/CarRentalOrder",
      name: '旅游出行-租车订单',
      component: CarRentalOrder,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/CarRentalRefund",
      name: '旅游出行-租车退款订单',
      component: CarRentalRefund,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/DealOrder/:id",
      name: '旅游出行-租车退款订单详情',
      component: DealOrder,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/vehicleEntry/:id/:state",
      name: '旅游出行-租车订单车辆信息',
      component: vehicleEntry,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/addCategory",
      name: '租赁闲置-添加商品类目',
      component: addCategory,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/PublishGoods/:goodId",
      name: '租赁闲置-发布商品',
      component: PublishGoods,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/MyReleasesGoods",
      name: '租赁闲置-我的发布',
      component: MyReleasesGoods,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/GoodOrders",
      name: '租赁闲置-商品订单',
      component: GoodOrders,
      meta: {
        needLogin: true
      }
    },
    {
      path: "/CurrentAnnouncement",
      name: '公告栏-当前公告',
      component: CurrentAnnouncement,
      meta: {
        needLogin: true
      }
    }
  ],
})
router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.needLogin) {
    //需要登录的页面
    // console.log(store.state.loginUser.data);
    if (store.state.loginUser.data) {
      //已登录
      if (to.path == '/AccountManagement') {
        if (store.state.loginUser.data.identity == "超级管理员") {
          next();
        } else {
          alert("没有权限");
          next(from.path); //跳回原来界面
        }
      } else {
        next();
      }
    } else {
      next("/login"); //跳转到登录页面
    }
  } else {
    next();
  }
})
export default router;