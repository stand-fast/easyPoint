<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>我的历史发布订单</h1>
        <div class="renderOrderNav title">
          <li class="navmiddle">同乡会</li>
          <li class="navBigger">出发地</li>
          <li class="navBigger">目的地</li>
          <li class="navTime">出发时间</li>
          <li class="navTime">发布时间</li>
          <li class="navmiddle">车辆类型</li>
          <li class="navmiddle">售价</li>
          <li class="navmiddle">剩余票数</li>
          <li class="navmiddle">购票详情</li>
          <li class="navmiddle">车辆信息</li>
          <li class="navSmall">操作</li>
        </div>
        <div class="renderOrderNav type">
          <li class="navmiddle">丰顺同乡会</li>
          <li class="navBigger">广金广州本部</li>
          <li class="navBigger">丰顺汽车客运站</li>
          <li class="navTime">2019-10-01 08:30:00.0</li>
          <li class="navTime">2019-9-10 12:30:00.0</li>
          <li class="navmiddle">53座豪华大巴</li>
          <li class="navmiddle">￥130</li>
          <li class="navmiddle">23</li>
          <li class="navmiddle enter" @click="purchaseDetails(1213)">购票详情</li>
          <li class="navmiddle enter" @click="vehicleInformation(1213)">车辆信息</li>
          <li class="navSmall enter" @click="shelves(1213)">删除</li>
        </div>
        <paging
          :value="current"
          :pageSize="pageSize"
          :pageNumber="pageNumber"
          :panelNumber="panelNumber"
          @input="handlePageChange"
        ></paging>
      </div>
    </ul>
  </div>
</template>
<script>
import paging from "../../components/paging.vue";
export default {
  data() {
    return {
      navName: "校友会包车",
      navPlateName: "历史发布",
      datas: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  mounted() {
    this.setData(); //获取历史发布订单数据
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      console.log("请求我的历史发布订单数据");
    },
    handlePageChange(pageNum) {
      var that = this;
    },
    purchaseDetails(id) {
      this.$router.push("/PurchaseDetails/" + id);
      console.log(id);
    },
    shelves(id) {
      if (confirm("确定要删除该历史车票订单吗?")) {
      } else {
        console.log("你取消了删除");
      }
    },
    vehicleInformation(id) {
      this.$router.push("/Vehicle/" + id);
      console.log(id);
    }
  },
  components: {
    paging
  }
};
</script>