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
            v-if="state == 1"
            size="mini"
            type="text"
            @click="shelvesGoods(scope.row.goodId,3)"
          >下架</el-button>
          <el-button
            v-if="state == 2"
            size="mini"
            type="text"
            @click="shelvesGoods(scope.row.goodId,2)"
          >发布</el-button>
          <el-button
            v-if="state == 3"
            size="mini"
            type="text"
            @click="shelvesGoods(scope.row.goodId,1)"
          >上架</el-button>
          <el-button
            v-if="state == 2 ||state == 3"
            size="mini"
            type="text"
            @click="delGoods(scope.row.goodId)"
          >删除</el-button>
        </template>
      </el-table-column>
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
      navPlateName: "我的发布",
      showAddVehicle: false, //是否显示添加车辆类型弹窗
      datas: [], //车辆类型数据
      state:1,//1：正在售卖；2：未发布 3：已下架
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
              that.totalNumber = null;
              break;
            case 1:
              that.datas = datas.data.goodsList;
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
    //修改商品状态
    shelvesGoods(goodId,state){
      let text = "";
      state == 1?
      text="是否确认上架该商品?"
      :
      text="是否确认下架该商品?"
      this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let that = this;
            let params = new URLSearchParams();
            params.append("goodsId", goodId);
            params.append("newState", state);
            this.$http
              .post("updateStateById", params)
              .then(res => {
                console.log(res.data);
                let data = res.data;
                let code = data.code;
                switch (code) {
                  case -1:
                    this.$message({
                      message: '修改失败！请稍后再试',
                      type: 'warning'
                    });
                    break;
                  case 0:
                    that.$message.error('该商品不存在');
                    break;
                  case 1:
                    that.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.handlePageChange(this.startIndex);
                    break;
                  case 2:
                    that.$message.error('商品参数有误');
                    break;
                  default:
                    that.$judgeToken(code);
                    break;
                }
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    //删除商品
    delGoods(goodId){
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let that = this;
            let params = new URLSearchParams();
            params.append("goodsId", goodId);
            this.$http
              .post("deleteGoodsById", params)
              .then(res => {
                console.log(res.data);
                let data = res.data;
                let code = data.code;
                switch (code) {
                  case -1:
                    this.$message({
                      message: '删除失败！请稍后再试',
                      type: 'warning'
                    });
                    break;
                  case 0:
                    that.$message.error('该商品不存在');
                    break;
                  case 1:
                    that.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    this.handlePageChange(this.startIndex);
                    break;
                  case 2:
                    that.$message.error('参数有误');
                    break;
                  default:
                    that.$judgeToken(code);
                    break;
                }
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });

    },
    //跳转编辑页面
    toGoodsDetails(goodId){
      this.$router.push("/PublishGoods/" + goodId);
    },
    //修改商品状态state获取商品数据
    changeState(state){
      this.state = state;
      this.startIndex = 1;
      this.handlePageChange(this.startIndex);
    }
  },
  components: {}
};
</script>