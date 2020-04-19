<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      (<span @click="changeState(1)" :class="state ===1 ? 'active':'' ">正在售卖</span>
        <span @click="changeState(2)" :class="state ===2 ? 'active':'' ">未发布</span>
        <span @click="changeState(3)" :class="state ===3 ? 'active':'' " style="margin-right:10px">已下架</span>)
      
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <!-- 展开部分 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商家名称">
              <span>{{ props.row.businessName }}</span>
            </el-form-item>
            <el-form-item label="商品ID">
              <span>{{ props.row.goodId }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.goodName }}</span>
            </el-form-item>
            <el-form-item label="最低价">
              <span>{{ props.row.lowestPrice }}</span>
            </el-form-item>
            <el-form-item label="最高价">
              <span>{{ props.row.highestPrice }}</span>
            </el-form-item>
            <el-form-item label="押金">
              <span>{{ props.row.deposit }}</span>
            </el-form-item>
            <el-form-item label="租赁次数">
              <span>{{ props.row.leaseNum }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 展示数据项部分 -->
      <el-table-column label="商家名称" prop="businessName"></el-table-column>
      <el-table-column label="商品名称" prop="goodName"></el-table-column>
      <el-table-column label="最低价" prop="lowestPrice"></el-table-column>
      <el-table-column label="最高价" prop="highestPrice"></el-table-column>
      <el-table-column label="押金" prop="deposit"></el-table-column>
      <el-table-column label="租赁次数" sortable prop="leaseNum"></el-table-column>
      <el-table-column label="车辆信息" fixed="right">
        <template slot-scope="scope">
          <!-- 车辆信息按钮 -->
          <el-button
            size="mini"
            type="text"
            @click="toGoodsDetails(scope.row.goodId)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="shelvesGoods(scope.row.goodId)"
          >下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      class="pageing"
      :page-count="totalNum"
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
      navPlateName: "我的发布",
      showAddVehicle: false, //是否显示添加车辆类型弹窗
      datas: [], //车辆类型数据
      state:1,//1：正在售卖；2：未发布 3：已下架
      startIndex: 1, //当前页码
      totalNum: null,//页码总数
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
          pageSize:that.pageSize,
          state:that.state,
          startIndex
      };
      this.$http
        .get("findGoodsByState", { params })
        .then(function(res) {
          console.log(res.data);
          let datas = res.data;
          let code = datas.code;
          switch (code) {
            case 0:
              that.$message({
                message: '暂时没有商品',
                type: 'warning'
              });
              that.datas = [];
              that.totalNum = null;
              break;
            case 1:
              that.datas = datas.data.goodsList;
              that.totalNum = datas.data.totalNum
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
    //下架商品
    shelvesGoods(goodId){
      console.log(goodId);
    },
    //跳转编辑页面
    toGoodsDetails(goodId){
      this.$router.push("/PublishGoods/" + goodId);
    },
    //修改商品状态state获取商品数据
    changeState(state){
      this.state = state;
      this.handlePageChange(this.startIndex);
    }
  },
  components: {}
};
</script>