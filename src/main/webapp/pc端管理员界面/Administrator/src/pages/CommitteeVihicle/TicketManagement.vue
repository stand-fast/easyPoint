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
              <span>{{ props.row.ticketId }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.issueTime }}</span>
            </el-form-item>
            <el-form-item label="同乡会">
              <span>{{ props.row.associationName }}</span>
            </el-form-item>
            <el-form-item label="出发地">
              <span>{{ props.row.departurePlace }}</span>
            </el-form-item>
            <el-form-item label="目的地">
              <span>{{ props.row.destination }}</span>
            </el-form-item>
            <el-form-item label="出发日期">
              <span>{{ props.row.departureDay }}</span>
            </el-form-item>
            <el-form-item label="出发时间">
              <span>{{ props.row.departureTime }}</span>
            </el-form-item>
            <el-form-item label="座位数">
              <span>{{ props.row.seatNum }}</span>
            </el-form-item>
            <el-form-item label="车票类型">
              <span v-if=" props.row.type == 1">正式车票</span>
              <span v-else-if=" props.row.type == 2">预售车票</span>
            </el-form-item>
            <el-form-item label="售价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="剩余票数">
              <span>{{ props.row.seatSurplus }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 展示数据项部分 -->
      <el-table-column label="同乡会" prop="associationName"></el-table-column>
      <el-table-column label="出发地" prop="departurePlace"></el-table-column>
      <el-table-column label="目的地" prop="destination"></el-table-column>
      <el-table-column label="出发日期" sortable prop="departureDay"></el-table-column>
      <el-table-column label="出发时间" sortable prop="departureTime"></el-table-column>
      <el-table-column label="座位数" sortable prop="seatNum"></el-table-column>
      <el-table-column label="车票类型" sortable prop="type" :formatter="formatType"></el-table-column>
      <el-table-column label="售价" sortable prop="price"></el-table-column>
      <el-table-column label="剩余票数" sortable prop="seatSurplus"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <!-- 购票详情按钮 -->
          <el-button size="mini" type="text" @click="purchaseDetails(scope.row.ticketId)">购票详情</el-button>

          <!-- 车辆信息按钮 -->
          <el-button size="mini" type="text" @click="vehicleInformation(scope.row.ticketId)">车辆信息</el-button>

          <!-- 下架弹窗 -->
          <el-popover width="180" title="确定要下架该车票订单吗？" trigger="click" v-model="scope.row.visible">
            <div class="spring-model-con-button">
              <el-button type="text" size="mini" @click="scope.row.visible = false;">取消</el-button>
              <el-button type="primary" size="mini" @click="endTicket(scope.row.ticketId)">确定</el-button>
            </div>
          </el-popover>

          <!-- 下架按钮 -->
          <el-button
            style="margin-left:15px"
            size="mini"
            type="text"
            @click="scope.row.visible = true;"
          >下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-size="pageSize"
      :total="totalNumber"
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
      navName: "校友会包车",
      navPlateName: "我的发布",
      datas: [], //数据部分
      current: 1, //当前页码
      pageSize: 8, //每页最大条数
      totalNumber: 5 //总条目数
    };
  },
  mounted() {
    this.handlePageChange(1); //获取订单数据
  },
  methods: {
    //根据页码获得订单数据
    async handlePageChange(page) {
      let that = this;
      let params = {
        state: 1,
        startIndex: page,
        pageSize: this.pageSize
      };
      this.$http
        .get("getTicket", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              that.$message({
                message: '没有查询到数据',
                type: 'warning'
              });
              break;
            case 1:
              console.log("查询车票成功");
              data.data.ticketList.forEach((res, index, arr) => {
                res.visible = false;
                return res;
              });
              this.datas = data.data.ticketList;
              this.totalNumber = data.data.ticketNum;
              this.current = page;
              break;
            case 2:
              that.$message({
                message: '参数为空',
                type: 'warning'
              });
              break;
            case 3:
              that.$message({
                message: '页码超出最大范围',
                type: 'warning'
              });
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
    //下架车辆
    endTicket(id) {
      let that = this;
      let params = new URLSearchParams();
      params.append("ticketId", id);
      this.$http
        .post("endTicket", params)
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              that.$message({
                message: '下架失败',
                type: 'warning'
              });
              break;
            case 1:
              that.$message({
                message: '下架成功',
                type: 'success'
              });
              this.handlePageChange(this.current);
              break;
            case 2:
              that.$message({
                message: '参数为空',
                type: 'warning'
              });
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
    //跳转购票详情
    purchaseDetails(id) {
      this.$router.push("/PurchaseDetails/" + id);
      console.log(id);
    },
    //跳转车票详情
    vehicleInformation(id) {
      this.$router.push("/Vehicle/" + id);
      console.log(id);
    },
    //格式化车票类型数据
    formatType: function(row, column, cellValue, index) {
      return row.type == 1 ? "正式车票" : "预售车票";
    }
  },
  components: {}
};
</script>
<style>
</style>