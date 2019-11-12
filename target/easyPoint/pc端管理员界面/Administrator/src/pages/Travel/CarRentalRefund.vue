<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车退款订单</h1>
        <div class="wrapperOrder">
          <li class="bigger">订单编号</li>
          <li>联系人</li>
          <li class="bigger">联系方式</li>
          <li>退款金额</li>
          <li class="time">退款时间</li>
          <li>退款状态</li>
          <li>操作</li>
        </div>
        <!-- 每页9条 -->
        <div class="wrapperOrder">
          <li class="bigger" title="3123123123123123"></li>
          <li>卢本伟</li>
          <li class="bigger" title="13012321245"></li>
          <li>￥200</li>
          <li class="time place"><span>2019-10-01 08:30:00.0</span></li>
          <li>未处理</li>
          <li class="enter" @click="dealOrder(23123123123123123)">处理</li>
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
    dealOrder(id) {
      this.$router.push("/DealOrder/" + id);
    }
  },
  components: {
    paging
  }
};
</script>