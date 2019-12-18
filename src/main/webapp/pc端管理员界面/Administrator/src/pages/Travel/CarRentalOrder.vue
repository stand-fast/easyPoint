<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <!-- 展开部分 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.travelOrderId }}</span>
            </el-form-item>
            <el-form-item label="出发地">
              <span>{{ props.row.departurePlace }}</span>
            </el-form-item>
            <el-form-item label="目的地">
              <span>{{ props.row.destination }}</span>
            </el-form-item>
            <el-form-item label="出行人数">
              <span>{{ props.row.travelNum }}</span>
            </el-form-item>
            <el-form-item label="出发时间">
              <span>{{ props.row.departureTime }}</span>
            </el-form-item>
            <el-form-item label="车辆类型">
              <span>{{ props.row.vehicleType }}</span>
            </el-form-item>
            <el-form-item label="定金">
              <span>{{ props.row.payMoney }}</span>
            </el-form-item>
            <el-form-item label="购买保险">
              <span v-if="props.row.ifInsurance == 0">否</span>
              <span v-else-if="props.row.ifInsurance == 1">是</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.passenger }}</span>
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span v-if="props.row.state == 0">未安排</span>
              <span v-else-if="props.row.state == 1">已安排</span>
              <span v-else-if="props.row.state == 2">已完成</span>
              <span v-else-if="props.row.state == 3">已付款</span>
              <span v-else-if="props.row.state == 4">已预约</span>
              <span v-else-if="props.row.state == 5">退款中</span>
              <span v-else-if="props.row.state == 6">已退款</span>
              <span v-else-if="props.row.state == 7">退款失败</span>
              <span v-else-if="props.row.state == 8">已取消</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 展示数据项部分 -->
      <el-table-column label="出发地" prop="departurePlace"></el-table-column>
      <el-table-column label="目的地" prop="destination"></el-table-column>
      <el-table-column label="出行人数" sortable prop="travelNum"></el-table-column>
      <el-table-column label="出发时间" sortable prop="departureTime"></el-table-column>
      <el-table-column label="车辆类型" sortable prop="vehicleType"></el-table-column>
      <el-table-column label="购买保险" sortable prop="ifInsurance" :formatter="formatInsurance"></el-table-column>
      <el-table-column label="订单状态" sortable prop="state" :formatter="formatState"></el-table-column>
      <el-table-column label="车辆信息" fixed="right">
        <template slot-scope="scope">
          <!-- 车辆信息按钮 -->
          <el-button
            size="mini"
            type="text"
            @click="handleVihicleInformation(scope.row.travelOrderId,scope.row.state)"
          >车辆信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-count="pageNumber"
      @current-change="handlePageChange"
      :current-page.sync="current"
      layout="prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navName: "旅游出行",
      navPlateName: "租车订单",
      datas: [], //租车订单数据
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
              data.data.partTourismOrderInfos.forEach((res, index, arr) => {
                res.payMoney = "￥" + res.payMoney;
                return res;
              });
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
          console.log(e);
        });
    },
    //获取分页数据
    handlePageChange(page) {
      let that = this;
      let params = { pageNum: page };
      this.$http
        .get("findListPageNumTourismOrderInfo", { params })
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
          console.log(e);
        });
    },
    //跳转车辆信息页面
    handleVihicleInformation(id, state) {
      this.$router.push("/vehicleEntry/" + id + "/" + state);
    },
    //格式化状态数据
    formatState: function(row, column, cellValue, index) {
      switch (row.state) {
        case 0:
          return "未安排";
        case 1:
          return "已安排";
        case 2:
          return "已完成";
        case 3:
          return "已付款";
        case 4:
          return "已预约";
        case 5:
          return "退款中";
        case 6:
          return "已退款";
        case 7:
          return "退款失败";
        case 8:
          return "已取消";
      }
    },
    //格式化保险数据
    formatInsurance: function(row, column, cellValue, index) {
      return row.ifInsurance == 0 ? "否" : "是";
    }
  },
  components: {}
};
</script>
<style scoped>
@import url(../../assets/travelOrder.css);
</style>