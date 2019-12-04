<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车订单</h1>
        <div class="wrapperOrder">
          <li class="bigger">出发地</li>
          <li class="bigger">目的地</li>
          <li>出行人数</li>
          <li class="time">出发时间</li>
          <li>类型</li>
          <li>定金</li>
          <li>购买保险</li>
          <li>姓名</li>
          <li class="bigger">手机号码</li>
          <li>订单状态</li>
          <li>车辆信息</li>
        </div>
        <!-- 遍历租车订单数据 -->
        <div class="wrapperOrder" v-for="item in datas" :key="item.travelOrderId">
          <li class="bigger" :title="item.departurePlace">{{item.departurePlace}}</li>
          <li class="bigger" :title="item.destination">{{item.destination}}</li>
          <li :title="item.travelNum">{{item.travelNum}}</li>
          <li class="time place" :title="item.departureTime">
            <span>{{item.departureTime}}</span>
          </li>
          <li :title="item.vehicleType">{{item.vehicleType}}</li>
          <li :title="item.payMoney">￥{{item.payMoney}}</li>
          <li v-if="item.ifInsurance == 0">否</li>
          <li v-if="item.ifInsurance == 1">是</li>
          <li :title="item.passenger">{{item.passenger}}</li>
          <li :title="item.phone" class="bigger">{{item.phone}}</li>
          <li v-if="item.state == 0">未安排</li>
          <li v-else-if="item.state == 1">已安排</li>
          <li v-else-if="item.state == 2">已完成</li>
          <li v-else-if="item.state == 3">已付款</li>
          <li v-else-if="item.state == 4">已预约</li>
          <li v-else-if="item.state == 5">退款中</li>
          <li v-else-if="item.state == 6">已退款</li>
          <li v-else-if="item.state == 7">退款失败</li>
          <li v-else-if="item.state == 8">已取消</li>
          <li class="enter">
            <span @click="handleVihicleInformation(item.travelOrderId,item.state)">进入</span>
          </li>
        </div>
        <!-- 页码组件 -->
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
      navPlateName: "租车订单",
      datas: [], //租车订单数据
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
    //获取首页数据以及页码总数
    async setData() {
      let that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("getTotalPageAndFirstTourismOrderInfoList")
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.pageNumber = data.data.totalPage;
              that.datas = data.data.partTourismOrderInfos;
              console.log("查询订单页数以及首页订单信息成功");
              break;
            case 201:
              alert("暂无订单信息");
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          alert("服务器繁忙，请稍后重试，请检查网络环境");
          console.log(e);
        });
    },
    //获取分页数据
    handlePageChange(page) {
      let that = this;
      this.$http
        .get("findListPageNumTourismOrderInfo", { params: { pageNum: page } })
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.current = page;
              that.datas = data.data;
              console.log(data.message);
              break;
            case 201:
              alert("已经加载完全部数据");
              break;
            default:
              that.$judgeToken(code);
              break;
          }
        })
        .catch(function(e) {
          alert("服务器繁忙，请稍后重试，请检查网络环境");
          console.log(e);
        });
    },
    //跳转车辆信息页面
    handleVihicleInformation(id, state) {
      this.$router.push("/vehicleEntry/" + id + "/" + state);
    }
  },
  components: {
    paging
  }
};
</script>
<style scoped>
@import url(../../assets/travelOrder.css);
</style>