<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      (
        <span @click="changeState(1)" :class="state ===1 ? 'active':'' ">未发货</span>
        <span @click="changeState(2)" :class="state ===2 ? 'active':'' ">已取货</span>
        <span @click="changeState(3)" :class="state ===3 ? 'active':'' " style="margin-right:10px">已完成</span>
      )
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <!-- 展开部分 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号">
              <span>{{ props.row.goodOrderId }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goodsDtoForOrder.goodName }}</span>
            </el-form-item>
            <el-form-item label="尺码">
              <span>{{ props.row.size }}</span>
            </el-form-item>
            <el-form-item label="商家">
              <span>{{ props.row.goodsDtoForOrder.businessName }}</span>
            </el-form-item>
            <el-form-item label="实际支付">
              <span>{{ props.row.totalPrice }}</span>
            </el-form-item>
            <el-form-item label="商品件数">
              <span>{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="租借天数">
              <span>{{ props.row.leaseDate }}</span>
            </el-form-item>
            <el-form-item label="买家姓名">
              <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="买家号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="下单时间">
              <span>{{ props.row.makeOrderTime }}</span>
            </el-form-item>
            <el-form-item label="取货时间" v-if="props.row.receiveTime">
              <span>{{ props.row.receiveTime }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span v-if="props.row.state == 1">未发货</span>
              <span v-else-if="props.row.state == 2">已取货</span>
              <span v-else-if="props.row.state == 3">已完成</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 展示数据项部分 -->
      <el-table-column label="商品" prop="goodsDtoForOrder.goodName"></el-table-column>
      <el-table-column label="尺码" prop="size"></el-table-column>
      <el-table-column label="商家" prop="goodsDtoForOrder.businessName"></el-table-column>
      <el-table-column label="实际支付" prop="totalPrice"></el-table-column>
      <el-table-column label="商品件数" prop="number"></el-table-column>
      <el-table-column label="租借天数" prop="leaseDate"></el-table-column>
      <el-table-column label="买家">
        <template slot-scope="scope">
            <el-popover width="280px" trigger="hover" placement="top">
            <p>姓名: {{ scope.row.userName }}</p>
            <p>手机号码: {{ scope.row.phone }}</p>
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.userName }}</el-tag>
            </div>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" sortable prop="makeOrderTime"></el-table-column>
      <el-table-column label="取货时间" v-if="state==2||state==3" sortable prop="receiveTime"></el-table-column>
      <el-table-column label="订单状态" :formatter="formatState" sortable prop="state"></el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-size="pageSize"
      :total="totalNumber"
      @current-change="handlePageChange"
      :current-page.sync="startIndex"
      layout="prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navName: "租赁闲置",
      navPlateName: "商品订单",
      showAddVehicle: false, //是否显示添加车辆类型弹窗
      datas: [], //订单数据
      state:1,//1:未发货;2:已取货;3已完成; null:查询全部
      startIndex: 1, //当前页码
      totalNumber: null,//页码总数
      pageSize:8,//每页最大条数
    };
  },
  computed: {},
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    //获取首页数据以及页码总数
    async handlePageChange(startIndex) {
      let that = this;
      let params = {
          pageSize:this.pageSize,
          state:this.state,
          startIndex
      };
      this.$http
        .get("findAllOrder", { params })
        .then(function(res) {
          console.log(res.data);
          let datas = res.data;
          let code = datas.code;
          switch (code) {
            case 0:
              that.$message({
                message: '暂时没有订单',
                type: 'warning'
              });
              that.datas = [];
              that.totalNumber = null;
              break;
            case 1:
              that.datas = datas.data.orders;
              that.totalNumber = datas.data.totalNum
              break;
            case 2:
              that.$message.error('参数有误');
              break;
            case 3:
              that.startIndex = 1;
              that.$message.error('页面超出最大范围');
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
    //修改商品状态state获取商品数据
    changeState(state){
      this.state = state;
      this.startIndex = 1;
      this.handlePageChange(this.startIndex);
    },
    //格式化状态内容
    formatState: function(row, column, cellValue, index) {
      switch (row.state) {
        case 1:
          return "未发货";
        case 2:
          return "已取货";
        case 3:
          return "已完成";
      }
    }
  },
  components: {}
};
</script>
<style>
.el-tag {
    color: #606266;
    background: none;
    width: 80px;
}
.el-popover{
    min-width: 180px;
}
.el-popover>p:nth-of-type(2){
    margin-top: 10px;   
}
</style>