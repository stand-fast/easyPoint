<template>
  <div>
    <!-- 顶部标题 -->
    <el-header class="model-wrapper-con-header">
      {{navName}}-{{navPlateName}}
      <span @click="showAddPlace = true;">添加上下车地点</span>
      <el-popover
        placement="top"
        title="添加上下车地点"
        width="300"
        trigger="click"
        v-model="showAddPlace"
      >
        <div class="spring-model-con">
          <li>
            <span>同乡会:</span>
            <el-input class="model-input" placeholder="请输入上下车地点" v-model="inputPlace" clearable></el-input>
          </li>
        </div>
        <div class="spring-model-con-button">
          <el-button type="text" size="mini" @click="showAddPlace = false;">取消</el-button>
          <el-button type="primary" size="mini" @click="setLocation">添加</el-button>
        </div>
      </el-popover>
    </el-header>
    <!-- 内容 -->
    <el-table :data="datas">
      <el-table-column label="上下车地点" prop="place"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- 删除弹窗 -->
          <el-popover
            class="column-width-5"
            placement="top"
            width="230"
            title="确认删除该上下车地点吗？"
            trigger="click"
            v-model="scope.row.visible"
          >
            <div class="spring-model-con-button">
              <el-button type="text" size="mini" @click="scope.row.visible = false;">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteLocation(scope.row.place)">确定</el-button>
            </div>
          </el-popover>
          <!-- 删除按钮 -->
          <el-button type="text" size="mini" @click="scope.row.visible = true;">删除</el-button>
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
      navPlateName: "添加上下车地点",
      showAddPlace: false, //是否显示添加上下车地点弹窗
      inputPlace: "", //添加上下车地点-地点
      datas: [], //上下车地点数据
      current: 1, //当前页码
      pageSize: 8, //每页最大条数
      totalNumber: 5 //总条目数
    };
  },
  computed: {
    //检查输入数据是否合法
    check() {
      if (this.inputPlace == "") {
        alert("上下车地点不能为空");
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    this.associationId = this.$route.params.id; //获取路由器传递的id值
    console.log("根据" + this.associationId + "请求数据");
    this.handlePageChange(1);
  },
  methods: {
    //获取上下车地点数
    async handlePageChange(page) {
      let that = this;
      let params = {
        associationId: this.associationId,
        startIndex: page,
        pageSize: this.pageSize
      };
      this.$http
        .get("findAllPlaces", { params })
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case 0:
              alert("没有查询到数据");
              break;
            case 1:
              console.log("查询成功");
              let newdata = [];
              data.data.placeList.forEach((res, index, arr) => {
                newdata.push({ place: res, visible: false });
              });
              this.datas = newdata;
              this.totalNumber = data.data.totalNum;
              this.current = page;
              break;
            case 2:
              alert("参数为空");
              break;
            case 3:
              alert("页码超出最大范围");
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
    //添加上下车地点
    setLocation(id) {
      if (this.check) {
        let that = this;
        let params = new URLSearchParams();
        params.append("associationId", this.associationId);
        params.append("place", this.inputPlace);
        this.$http
          .post("addAssociationPlace", params)
          .then(res => {
            console.log(res.data);
            let data = res.data;
            let code = data.code;
            switch (code) {
              case -3:
                alert("此同乡会已经添加过该地址");
                break;
              case -2:
                alert("该同乡会不存在");
                break;
              case -1:
                alert("添加失败,请稍后再试");
                break;
              case 0:
                alert("参数错误!");
                break;
              case 1:
                //alert("添加成功");
                this.showAddPlace = false;
                this.handlePageChange(this.current);
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
    //删除上下车地点
    deleteLocation(item) {
      let that = this;
      let params = new URLSearchParams();
      params.append("associationId", this.associationId);
      params.append("place", item);
      this.$http
        .post("deleteAssociationPlace", params)
        .then(res => {
          console.log(res.data);
          let data = res.data;
          let code = data.code;
          switch (code) {
            case -1:
              alert("删除失败");
              break;
            case 0:
              alert("参数为空");
              break;
            case 1:
              console.log("删除成功");
              this.handlePageChange(this.current);
              break;
            case 2:
              alert("没添加过该地址或没有此同乡会");
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