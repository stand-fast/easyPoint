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
        <!-- 每页9条 状态:1：待处理，2：审核不通过；3：审核通过；4：已取消-->
        <div class="wrapperOrder" v-for="item in datas" :key="item.transactionId">
          <li class="bigger" :title="item.transactionId">{{item.transactionId}}</li>
          <li :title="item.passenger">{{item.passenger}}</li>
          <li class="bigger" :title="item.phone">{{item.phone}}</li>
          <li :title="item.refundMoney">￥{{item.refundMoney}}</li>
          <li class="time place" :title="item.requestRefundTime">
            <span>{{item.requestRefundTime}}</span>
          </li>
          <li v-if="item.refundState==1">待处理</li>
          <li v-if="item.refundState==2">审核不通过</li>
          <li v-if="item.refundState==3">审核通过</li>
          <li v-if="item.refundState==4">已取消</li>
          <li class="enter" @click="dealOrder(item.tourismRefundId)">处理</li>
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
      this.$http
        .get("tourismRefund/FirstPage")
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.pageNumber = data.data.totalPage;
            that.datas = data.data.tourismRefundInfoList;
            console.log("请求退款订单首页数据和总页数成功");
          } else if (data.code == 201) {
            alert("暂无订单信息");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    handlePageChange(pageNum) {
      var that = this;
      this.$http
        .get("tourismRefunds/page", { params: { pageNum: pageNum } })
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.current = pageNum;
            that.datas = data.data;
            console.log(data.message);
          } else if (data.code == 201) {
            console.log(data.message);
          } else if (data.code == 401) {
            console.log(data.message);
          }
        })
        .catch(function(e) {
          console.log(e);
        });
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