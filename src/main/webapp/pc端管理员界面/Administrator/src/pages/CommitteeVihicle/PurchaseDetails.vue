<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">{{navName}}-{{navPlateName}}</el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <!-- 展示数据项部分 -->
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="票价" prop="price"></el-table-column>
      <el-table-column label="数量" sortable prop="buyNum"></el-table-column>
      <el-table-column label="购票时间" sortable prop="buyTime"></el-table-column>
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
      navName: "校友会包车",
      navPlateName: "购票详情",
      plateId: -1, //订单id
      datas: [], //订单购票详情数据
      pageSize: 8, //每页最大条数
      current: 1, //当前页码
      pageNumber: 5 //页码总数
    };
  },
  mounted() {
    this.plateId = this.$route.params.id;
    console.log("根据" + this.plateId + "请求数据");
    this.handlePageChange(1); //获取订单数据
  },
  methods: {
    async handlePageChange(page) {
      let that = this;
      let params = {
        ticketId: this.plateId,
        startIndex: page,
        pageSize: this.pageSize
      };
      this.$http
        .get("findBuyDetail", { params })
        .then(res => {
          console.log(res.data);
          var data = res.data;
          var code = data.code;
          switch (code) {
            case 0:
              that.$message({
                message: '暂无购票信息',
                type: 'warning'
              });
              break;
            case 1:
              console.log("查询成功");
              this.datas = data.data.detail;
              this.current = page;
              this.pageNumber =
                data.data.total % this.pageSize == 0
                  ? data.data.total / this.pageSize
                  : parseInt(data.data.total / this.pageSize) + 1;
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
    }
  },
  components: {}
};
</script>