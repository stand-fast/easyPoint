<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>购票详情</h1>
        <div class="purchaseDetails title">
          <li class="navBigger">姓名</li>
          <li class="navBigger">联系方式</li>
          <li class="navBigger">票价</li>
          <li class="navBigger">数量</li>
          <li class="navBigger">购票时间</li>
        </div>
        <div class="purchaseDetails type">
          <li class="navBigger">卢本伟</li>
          <li class="navBigger">13123112312</li>
          <li class="navBigger">￥130</li>
          <li class="navBigger">2</li>
          <li class="navBigger">2019-10-01 08:30:00.0</li>
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
      navPlateName: "购票详情",
      datas: [],
      pageSize: 10, //每页最大条数
      panelNumber: 5, //最多显示多少个分页按钮
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  mounted() {
    const id = this.$route.params.id;
    console.log("根据" + id + "请求数据");
    this.setData(); //获取订单数据
  },
  methods: {
    async setData() {
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      console.log("请求购票详情数据");
    },
    handlePageChange(pageNum) {
      var that = this;
    }
  },
  components: {
    paging
  }
};
</script>
<style scoped>
.purchaseDetails {
  height: 40px;
  line-height: 40px;
  display: flex;
  text-align: center;
}

.title {
  color: #ffffff;
  margin-top: 10px;
  background-color: #8fd68b;
}

.title li {
  font-size: 14px;
}

.purchaseDetails li {
  font-size: 14px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ffffff;
}

.type:nth-child(2n) {
  color: #999999;
  background-color: #b4e3b1;
}

.type:nth-child(2n + 1) {
  color: #8fd68b;
  background-color: #e9f7e8;
}
.navBigger {
  padding: 0 5px;
  box-sizing: border-box;
  width: 240px;
}
</style>