<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <!-- 展开部分 -->
      <el-table-column type="expand" @click="test()">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号">
              <span>{{ props.row.transactionId }}</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ props.row.passenger }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="退款金额">
              <span>{{ props.row.refundMoney }}</span>
            </el-form-item>
            <el-form-item label="退款时间">
              <span>{{ props.row.requestRefundTime }}</span>
            </el-form-item>
            <el-form-item label="退款状态">
              <span v-if="props.row.refundState == 1">待处理</span>
              <span v-else-if="props.row.refundState == 2">审核不通过</span>
              <span v-else-if="props.row.refundState == 3">审核通过</span>
              <span v-else-if="props.row.refundState == 4">已取消</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 展示数据项部分 -->
      <el-table-column label="联系人" prop="passenger"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="退款金额" sortable prop="refundMoney"></el-table-column>
      <el-table-column label="退款时间" sortable prop="requestRefundTime"></el-table-column>
      <el-table-column label="退款状态" sortable prop="refundState" :formatter="formatState"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- 操作按钮 -->
          <el-button size="mini" type="text" @click="dealOrder(scope.row.tourismRefundId)">处理</el-button>
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
      navPlateName: "租车退款订单",
      datas: [], //退款订单数据
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    test() {
      console.log(1);
    },
    //获取首页数据以及页码总数
    async setData() {
      let that = this;
      window.onscroll = e => e.preventDefault(); //兼容浏览器
      this.$http
        .get("tourismRefund/FirstPage")
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.pageNumber = data.data.totalPage;
              that.datas = data.data.tourismRefundInfoList;
              console.log("请求退款订单首页数据和总页数成功");
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
    //获取分页
    handlePageChange(pageNum) {
      let that = this;
      let params = { pageNum: pageNum };
      this.$http
        .get("tourismRefunds/page", { params })
        .then(function(res) {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 200:
              that.current = pageNum;
              that.datas = data.data;
              console.log(data.message);
              break;
            case 201:
              alert(data.message);
              break;
            case 401:
              alert(data.message);
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
    //跳转订单详情
    dealOrder(id) {
      this.$router.push("/DealOrder/" + id);
    },
    //格式化退款状态数据
    formatState: function(row, column, cellValue, index) {
      switch (row.refundState) {
        case 1:
          return "待处理";
        case 2:
          return "审核不通过";
        case 3:
          return "审核通过";
        case 4:
          return "已取消";
      }
    }
  },
  components: {}
};
</script>