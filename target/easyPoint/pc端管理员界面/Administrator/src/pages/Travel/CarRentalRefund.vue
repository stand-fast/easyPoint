<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车退款订单</h1>
        <div class="renderOrderNav title">
          <li class="navBigger">出发地</li>
          <li class="navBigger">目的地</li>
          <li class="navTime">出发时间</li>
          <li class="navmiddle">类型</li>
          <li class="navmiddle">定金</li>
          <li class="navmiddle">购买保险</li>
          <li class="navmiddle">姓名</li>
          <li class="navmiddle navphone">手机号码</li>
          <li class="navmiddle">订单状态</li>
          <li class="navmiddle">退款原因</li>
          <li class="navSmall">删除</li>
          <li class="navSmall">退款</li>
        </div>
        <div class="renderOrderNav type">
          <li class="navBigger">广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区</li>
          <li class="navBigger">广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区</li>
          <li class="navTime">2019-10-01 08:30:00.0</li>
          <li class="navmiddle">53座大巴</li>
          <li class="navmiddle">￥1000</li>
          <li class="navmiddle">是</li>
          <li class="navmiddle">卢本伟</li>
          <li class="navmiddle navphone">13012313211</li>
          <li class="navmiddle">未安排</li>
          <li class="navmiddle enter" @click="refundReason(123123)">退款原因</li>
          <li class="navSmall enter" @click="deleteOrder(123)">删除</li>
          <li class="navSmall enter" @click="refundOrder(123123)">退款</li>
        </div>
        <div class="renderOrderNav type">
          <li class="navBigger">广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区</li>
          <li class="navBigger">广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区广州市区</li>
          <li class="navTime">2019-10-01 08:30:00.0</li>
          <li class="navmiddle">53座大巴</li>
          <li class="navmiddle">￥1000</li>
          <li class="navmiddle">是</li>
          <li class="navmiddle">卢本伟</li>
          <li class="navmiddle navphone">13012313211</li>
          <li class="navmiddle">未安排</li>
          <li class="navmiddle enter" @click="refundReason(123123)">退款原因</li>
          <li class="navSmall enter" @click="deleteOrder(123)">删除</li>
          <li class="navSmall enter" @click="refundOrder(123123)">退款</li>
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
      navName: "旅游出行",
      navPlateName: "租车退款订单",
      datas: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    async setData() {
      var that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
    },
    handlePageChange(pageNum) {
      var that = this;
    },
    refundReason(id) {
      console.log(id);
    },
    deleteOrder(id) {
      console.log(id);
    },
    refundOrder(id) {
      console.log(id);
    }
  },
  components: {
    paging
  }
};
</script>