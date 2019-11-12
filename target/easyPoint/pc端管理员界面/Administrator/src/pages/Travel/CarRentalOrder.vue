<template>
  <div>
    <ul class="PageContentRight">
      <div class="PageContentRightTitle">
        <div class="IconTitle"></div>
        <div class="TitleText">{{navName}} > {{navPlateName}}</div>
      </div>
      <div class="PageContent">
        <h1>租车订单</h1>
        <div class="renderOrderNav title">
          <li class="navBigger">出发地</li>
          <li class="navBigger">目的地</li>
          <li class="navmiddle">出行人数</li>
          <li class="navTime">出发时间</li>
          <li class="navmiddle">类型</li>
          <li class="navmiddle">定金</li>
          <li class="navmiddle">购买保险</li>
          <li class="navmiddle">姓名</li>
          <li class="navmiddle navphone">手机号码</li>
          <li class="navmiddle">订单状态</li>
          <li class="navmiddle">车辆信息</li>
        </div>
        <div class="renderOrderNav type" v-for="item in datas" :key="item.travelOrderId">
          <li class="navBigger">{{item.departurePlace}}</li>
          <li class="navBigger">{{item.destination}}</li>
          <li class="navmiddle">{{item.travelNum}}</li>
          <li class="navTime">{{item.departureTime}}</li>
          <li class="navmiddle">{{item.vehicleType}}</li>
          <li class="navmiddle">￥{{item.payMoney}}</li>
          <li class="navmiddle" v-if="item.ifInsurance == 0">否</li>
          <li class="navmiddle" v-if="item.ifInsurance == 1">是</li>
          <li class="navmiddle">{{item.passenger}}</li>
          <li class="navmiddle navphone">{{item.phone}}</li>
          <li class="navmiddle" v-if="item.state == 0">未安排</li>
          <li class="navmiddle" v-if="item.state == 1">已安排</li>
          <li class="navmiddle" v-if="item.state == 2">已完成</li>
          <li class="navmiddle enter">
            <span @click="handleVihicleInformation(item.travelOrderId)">进入</span>
          </li>
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
      navPlateName: "租车订单",
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
        .get("getTotalPageAndFirstTourismOrderInfoList")
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.pageNumber = data.data.totalPage;
            that.datas = data.data.partTourismOrderInfos;
            console.log("查询订单页数以及首页订单信息成功");
          } else if (data.code == 201) {
            alert("暂无订单信息");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    handlePageChange(page) {
      var that = this;
      this.$http
        .get("findListPageNumTourismOrderInfo", { params: { pageNum: page } })
        .then(function(res) {
          console.log(res.data);
          var data = res.data;
          if (data.code == 200) {
            that.current = page;
            that.datas = data.data;
            console.log(data.message);
          } else if (data.code == 201) {
            console.log("已经加载完全部数据");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
    },
    handleVihicleInformation(id) {
      this.$router.push("/vehicleEntry/" + id);
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