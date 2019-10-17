import Vue from 'vue';
import Router from 'vue-router';
import PublishGoods from "./pages/Lease/PublishGoods.vue"; //租赁板块-发布商品
import MySave from "./pages/Lease/MySave.vue"; //租赁板块-我的保存
import MyUpload from "./pages/Lease/MyUpload.vue"; //租赁板块-我的上传
import MyOrder from "./pages/Lease/MyOrder.vue"; //租赁板块-我的上传
Vue.use(Router)

export default new Router({
  routes: [{
      path: "/",
      name: 'PublishGoods',
      component: PublishGoods
    },
    {
      path: "/MySave",
      name: 'MySave',
      component: MySave
    },
    {
      path: "/MyUpload",
      name: 'MyUpload',
      component: MyUpload
    },
    {
      path: "/MyOrder",
      name: 'MyOrder',
      component: MyOrder
    }
  ],
})